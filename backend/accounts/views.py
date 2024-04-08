
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

# class CustomTokenAuthentication(TokenAuthentication):
#     def authenticate_credentials(self, key):
#         try:
#             token = self.get_model().objects.select_related('user').get(key=key)
#         except self.get_model().DoesNotExist:
#             raise AuthenticationFailed('Invalid token')

#         if not token.user.is_active:
#             raise AuthenticationFailed('User inactive or deleted')

#         # Override the user_id value here
#         user_id = 123

#         print(self.get_model().objects.select_related('user'))
#         print(123)

#         return (user_id, token)
# from rest_framework_simplejwt.tokens import AccessToken

class CustomAccessToken(AccessToken):
    def __init__(self, token, user_id):
        super().__init__(token)
        self.payload['user_id'] = user_id
        
        

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user = super().get_user(validated_token)
        # Override the user data here
        user.username = 'new_username'
        user.email = 'new_email@example.com'
        print(123)
        return user