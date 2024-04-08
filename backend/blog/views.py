from django.shortcuts import render
from rest_framework import generics,views
from .models import Blog, Comment, Group, Reaction
from .serializers import BlogSerializer, GroupSerializer, CommentSerilaizer
from rest_framework.response import Response
from accounts.serializers import MemeberOfGroupSerializer,UserPublicProfileSerializer
from accounts.models import CustomUser
# Create your views here.
from django.db.models import Subquery, OuterRef
from rest_framework.parsers import MultiPartParser, FormParser


class BlogsListCreateByGroupAPIView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = BlogSerializer
    parser_classes = (MultiPartParser, FormParser)
    lookup_field="id"

    def list(self, request, *args, **kwargs):
        group = self.get_object()

        serializer = self.get_serializer(group.blogs,many=True)    
        return Response(serializer.data)
    
    def perform_create(self, serializer):
        # self.
        
        # serializer
        return super().perform_create(serializer)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"group":self.get_object()})
        return context

class UserHomeBlogsListGroupAPIView(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        joined_group_ids = self.request.user.joined_groups.values('id')

        blogs_from_joined_groups = Blog.objects.filter(group__id__in=Subquery(joined_group_ids))

        blogs_from_joined_groups = blogs_from_joined_groups.order_by('-create_at')
        
        print(blogs_from_joined_groups)
        return blogs_from_joined_groups



# class BlogsCreateByUserAPIView(generics.CreateAPIView):
#     queryset = Blog.objects.all()
#     serializer_class = BlogSerializer


class UserGroupsListAPIView(generics.ListAPIView):
    serializer_class = GroupSerializer

    def get_queryset(self):
        user = self.request.user
        return user.joined_groups.all()

class UserBlogsListAPIView(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return user.blogs.all()


class UserPublicProfileRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserPublicProfileSerializer



class GroupMemebersListAPIView(generics.ListAPIView):
    queryset = Group.objects.all()
    serializer_class = MemeberOfGroupSerializer

    def list(self, request, *args, **kwargs):
        members = self.get_object().users
        serializer = self.get_serializer(members,many=True)
        return Response(serializer.data)




class BlogRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def destroy(self, request):
        instance = self.get_object()

        serializer = BlogSerializer(instance)

        if serializer.is_valid():
            instance.delete()

        return Response(serializer.data)


class GroupListCreateAPIView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def list(self, request):
        group_name = request.query_params.get("group_name")
        queryset = self.get_queryset()

        if group_name:
            queryset = queryset.filter(name=group_name)

        serializer = self.get_serializer(queryset,many=True)    
        return Response(serializer.data)

class GroupRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class GroupAddUserAPIView(views.APIView):
    pass


class CommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerilaizer

    def list(self, request):
        blog_id = request.query_params.get("blog_id")
        queryset = self.get_queryset()

        if blog_id:
            queryset = queryset.filter(blog__id=blog_id)

        serializer = self.get_serializer(queryset,many=True)    
        return Response(serializer.data)


class CommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerilaizer
    partial = True


class ReactionListCreateAPIView(generics.ListCreateAPIView):
    pass


class ReactionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    pass
