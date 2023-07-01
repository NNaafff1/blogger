from django.shortcuts import render
from rest_framework import generics,views
from .models import Blog, Comment, Group, Reaction, User
from .serializers import BlogSerializer, GroupSerializer, CommentSerilaizer
from rest_framework.response import Response


# Create your views here.


class BlogsListCreateByGroupAPIView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def list(self, request, *args, **kwargs):
        group_name = request.query_params.get("group_name", None)
        user_id = request.query_params.get("user_id",None)
        queryset = self.get_queryset()

        if group_name:
            queryset = queryset.filter(group__name__contains=group_name)

        if user_id:
            queryset = queryset.filter(user__id=user_id)

        serializer = self.get_serializer(queryset,many=True)    
        return Response(serializer.data)


# class BlogsCreateByUserAPIView(generics.CreateAPIView):
#     queryset = Blog.objects.all()
#     serializer_class = BlogSerializer


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
