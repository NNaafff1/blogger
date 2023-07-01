from rest_framework import serializers
from . import models
from django.contrib.auth.models import User


class UserHyperLinkedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]
        # extra_kwargs = {
        #     "url": {"view_name": "user-details", "lookup_field": "username"},
        #     "users": {"lookup_field": "username"},
        # }


class GroupHyperLinkedSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = ["id", "name"]


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = "__all__"
        read_only_fields = ["admin", "users"]

    def create(self, validated_data):
        admin = self.context["request"].user

        group_name = validated_data.get("name", None)

        if group_name:
            group = models.Group.objects.create(admin=admin, name=group_name)
            print(group)
            return group

        raise serializers.ValidationError("No group name is provided")

    def update(self, instance, validated_data):
        group_name = validated_data.get("name", None)
        print(validated_data)
        if group_name:
            instance.name = group_name
            return instance

        raise serializers.ValidationError("No group name is provided")
    

class CommentSerilaizer(serializers.ModelSerializer):
    user = UserHyperLinkedSerializer(read_only=True)
    blog_id = serializers.IntegerField(write_only=True,required=False)

    class Meta:
        model = models.Comment
        exclude = ["blog"]

    def create(self, validated_data):
        blog_id = validated_data.get("blog_id", None)
        user = self.context["request"].user
        
        if not blog_id:
            raise serializers.ValidationError("blog is required")

        blog = models.Blog.objects.get(id=blog_id)

        if blog:
            comment = models.Comment.objects.create(
                blog=blog, user=user, text=validated_data.get("text")
            )
            return comment
        raise serializers.ValidationError("no such blog")
    

    def update(self,instance,validated_data):
        blog_id = validated_data.get('blog_id')
        blog = instance.blog

        if blog_id:
            blog = models.Blog.objects.get(id=blog_id)

        instance.blog = blog    
        instance.text = validated_data.get('text',instance.text)

        instance.save()
        return instance
    
    

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reaction
        fields = "__all__"
        read_only_fields = ["create_at"]





class BlogSerializer(serializers.ModelSerializer):
    user = UserHyperLinkedSerializer(read_only=True)
    group = GroupHyperLinkedSerializer(read_only=True)
    # comments = CommentSerilaizer(many=True, read_only=True)
    group_id = serializers.IntegerField(write_only = True)

    class Meta:
        model = models.Blog
        fields = "__all__"

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
        group = models.Group.objects.get(id=validated_data.get("group_id"))

        blog = models.Blog.objects.create(
            user=self.context["request"].user,
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
