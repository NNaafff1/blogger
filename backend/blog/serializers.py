from rest_framework import serializers
from . import models
from accounts.models import CustomUser



class UserHyperLinkedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username"]
        # extra_kwargs = {
        #     "url": {"view_name": "user-details", "lookup_field": "username"},
        #     "users": {"lookup_field": "username"},
        # }




class GroupHyperLinkedSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = ["id", "name"]


class GlobalSearchSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.SerializerMethodField()
    item_type = serializers.SerializerMethodField()


    def get_item_type(self,obj):
        return obj.__class__.__name__ if obj.__class__.__name__!= "CustomUser" else "User";
    
    def get_name(self,obj):
        if obj.__class__.__name__ =="Group":
            return obj.name
        elif obj.__class__.__name__ =="CustomUser":
            return obj.username


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = "__all__"
        read_only_fields = ["admin", "users"]

    def create(self, validated_data):
        admin = self.context["request"].user
        group_name = validated_data.get("name")
        
        group = models.Group.objects.create(admin=admin, name=group_name)
        group.users.add(admin)

        return group


    def update(self, instance, validated_data):
        group_name = validated_data.get("name")
        instance.name = group_name
        return instance
    

class CommentSerilaizer(serializers.ModelSerializer):
    user = UserHyperLinkedSerializer(read_only=True)

    class Meta:
        model = models.Comment
        exclude = ["blog"]
        ordering = ["-create_at"]


    def create(self, validated_data):
        blog = self.context["blog"]
        user = self.context["request"].user

        comment = models.Comment.objects.create(
            blog=blog, user=user, text=validated_data.get("text")
        )
        
        return comment
        
        
    def update(self,instance,validated_data):
        instance.text = validated_data.get('text',instance.text)
        instance.save()
        return instance
    
    

class ReactionSerializer(serializers.ModelSerializer):
    user = UserHyperLinkedSerializer(read_only=True)

    class Meta:
        model = models.Reaction
        exclude = ["blog"]
        read_only_fields = ["create_at"]
        # write_only_fields =["blog"]

    def create(self, validated_data):
        user = self.context["request"].user
        blog = self.context["blog"]

        reaction = models.Reaction.objects.create(
            user=user,
            blog=blog,
            reaction_code = validated_data.get("reaction_code")
        )
        return reaction  


    def update(self, instance, validated_data):
        instance.reaction_code = validated_data.get("reaction_code")
        instance.save()
        return instance






class BlogSerializer(serializers.ModelSerializer):
    user = UserHyperLinkedSerializer(read_only=True)
    group = GroupHyperLinkedSerializer(read_only=True)
    # comments = CommentSerilaizer(many=True, read_only=True)

    class Meta:
        model = models.Blog
        fields = "__all__"
        ordering = ["-create_at"]

    def validate(self, data):
        request = self.context["request"]

        # TODO PUT ??
        if request.method == "PACH" or request.method == "DELETE":
            authenticated_user = request.user
            blog_user = data.get("blog").user

            if blog_user.id != authenticated_user.id:
                raise serializers.ValidationError("User is not authorized")

        return data

    def create(self, validated_data):
        user = self.context["request"].user
        group = self.context.get('group')
       
        blog = models.Blog.objects.create(
            user=user,
            group=group,
            text=validated_data.get("text"),
            image=validated_data.get("image"),
        )

        return blog

    def update(self, instance, validated_data):
        instance.text = validated_data.get("text", instance.text)
        instance.image = validated_data.get("image", instance.image)

        instance.save()

        return instance

