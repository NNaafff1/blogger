from django.urls import path, include

from . import views

urlpatterns = [
    path("api/search", view=views.GlobalSearchAPIView.as_view()),
    path("api/groups/<int:id>/blogs/", view=views.BlogsListCreateByGroupAPIView.as_view()),
    path("api/users/<int:id>/blogs", view=views.UserBlogsListAPIView.as_view()),
    path("api/blogs/home", view=views.UserHomeBlogsListGroupAPIView.as_view()),
    path("api/users/<int:pk>", view=views.UserPublicProfileRetrieveUpdateAPIView.as_view()),
    path("api/groups/<int:id>/members/", view=views.GroupMemebersListAPIView.as_view()),
    # path("api/groups/<int:id>/members/new-member", view=views.GroupAddUserAPIView.as_view()),
    path("api/members/<int:id>/groups", view=views.UserGroupsListAPIView.as_view()),
    path("api/blogs/<int:pk>", view=views.BlogUpdateDestroyAPIView.as_view()),
    path("api/groups/", view=views.GroupListCreateAPIView.as_view(),name='groups'),
    path("api/groups/<int:pk>", view=views.GroupRetrieveUpdateDestroyAPIView.as_view()),
    # path("api/groups/<int:pk>/add-user", view=views.GroupAddUserAPIView.as_view()),
    path("api/blogs/<int:id>/comments/", view=views.CommentListCreateAPIView.as_view()),
    path(
        "api/comments/<int:pk>",
        view=views.CommentRetrieveUpdateDestroyAPIView.as_view(),
    ),
    path("api/blogs/<int:pk>/reactions/", view=views.ReactionsListCreateAPIView.as_view()),
    path(
        "api/reactions/<int:pk>",
        view=views.ReactionRetrieveUpdateDestroyAPIView.as_view(),
    ),
]
