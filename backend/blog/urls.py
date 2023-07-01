from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/blogs/", view=views.BlogsListCreateByGroupAPIView.as_view()),
    path("api/blogs/<int:pk>", view=views.BlogUpdateDestroyAPIView.as_view()),
    path("api/groups/", view=views.GroupListCreateAPIView.as_view(),name='groups'),
    path("api/groups/<int:pk>", view=views.GroupRetrieveUpdateDestroyAPIView.as_view()),
    path("api/groups/<int:pk>/add-user", view=views.GroupAddUserAPIView.as_view()),
    path("api/comments/", view=views.CommentListCreateAPIView.as_view()),
    path(
        "api/comments/<int:pk>",
        view=views.CommentRetrieveUpdateDestroyAPIView.as_view(),
    ),
    path("api/reactions/", view=views.ReactionListCreateAPIView.as_view()),
    path(
        "api/reactions/<int:pk>",
        view=views.ReactionRetrieveUpdateDestroyAPIView.as_view(),
    ),
]
