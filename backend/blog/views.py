from django.shortcuts import render
from rest_framework import generics,views
from .models import Blog, Comment, Group, Reaction
from .serializers import BlogSerializer, GroupSerializer, CommentSerilaizer,ReactionSerializer,GlobalSearchSerializer
from rest_framework.response import Response
from accounts.serializers import MemeberOfGroupSerializer,UserPublicProfileSerializer
from accounts.models import CustomUser
# Create your views here.
from django.db.models import Subquery, OuterRef
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.db.models import Q
from itertools import  chain


class GlobalSearchAPIView(generics.ListAPIView):
    serializer_class = GlobalSearchSerializer

    def get_queryset(self):
        name = self.request.query_params.get("name",None)

        groups = Group.objects.filter(name__contains=name)
        users = CustomUser.objects.filter(Q(username__contains=name)|Q(first_name__contains=name)|Q(last_name__contains=name))
        resault_query = list(groups)+list(users)

        return resault_query
     

class BlogsListCreateByGroupAPIView(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    parser_classes = (MultiPartParser, FormParser)
    lookup_field="id"


    def get_queryset(self):
        group = self.get_object()
        return group.blogs.all()


    def get_object(self):
        return get_object_or_404(Group,id=self.kwargs.get("id"))
    
    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"group": self.get_object()})
        return context

class UserHomeBlogsListGroupAPIView(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        joined_group_ids = self.request.user.joined_groups.values('id')

        blogs_from_joined_groups = Blog.objects.filter(group__id__in=Subquery(joined_group_ids))

        blogs_from_joined_groups = blogs_from_joined_groups.order_by('-create_at')
        
        return blogs_from_joined_groups




class UserGroupsListAPIView(generics.ListAPIView):
    serializer_class = GroupSerializer

    def get_queryset(self):
        user_id = self.kwargs.get("id")
        
        try:
            user = get_user_model().objects.get(id=user_id)
        except get_user_model().DoesNotExist:
            raise NotFound(detail="User not found", code=404)
        
        return user.joined_groups.order_by("id")
    
   
class UserBlogsListAPIView(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        user = self.request.user
        return user.blogs.all()


class UserPublicProfileRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserPublicProfileSerializer



class GroupMemebersListAPIView(generics.ListAPIView):
    serializer_class = MemeberOfGroupSerializer

    def get_queryset(self):
        group_id = self.kwargs.get("id")

        try:
            group = Group.objects.get(id=group_id)
        except Group.DoesNotExist:
            raise NotFound(detail="Group with given id is not found")
        
        return group.users.order_by("first_name").all()



class BlogRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

# TODO fix in backend
    # def destroy(self, request):
    #     instance = self.get_object()

    #     serializer = BlogSerializer(instance)

    #     if serializer.is_valid():
    #         instance.delete()

    #     return Response(serializer.data)


class GroupListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = GroupSerializer

    def get_queryset(self):
        group_name = self.request.query_params.get("name",None)
        groups = Group.objects.all()

        if group_name:
            groups =groups.filter(name__contains=group_name)
        return groups


class GroupRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class GroupAddUserAPIView(views.APIView):

    def post(self,request,id):
        new_user_id = request.data.get("user_id",None)

        if new_user_id is None:
            return Response({"message":"user is required"},status=status.HTTP_400_BAD_REQUEST)

        new_user = get_object_or_404(get_user_model(),id=new_user_id)
        group = get_object_or_404(Group,id=id)
        group.users.add(new_user)

        return Response({"message": "user added to group successfully"})



class CommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerilaizer

    def get_object(self):
        return get_object_or_404(Blog,id=self.kwargs.get("id"))

    def get_queryset(self):
        return self.get_object().comments.order_by("-create_at").all()
    

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"blog":self.get_object()})
        return context

class CommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerilaizer
    partial = True


class ReactionsListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ReactionSerializer
    
    def get_object(self):
        return get_object_or_404(Blog,id=self.kwargs.get("pk"))
    

    def get_queryset(self):
        return Reaction.objects.filter(blog=self.get_object())
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"blog":self.get_object()})
        return context



class ReactionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReactionSerializer
    queryset = Reaction.objects.all()