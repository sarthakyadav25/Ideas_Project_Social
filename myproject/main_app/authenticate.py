# cookieapp/authenticate.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions
from django.conf import settings
import jwt
from rest_framework.response import Response

from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions

def enforce_csrf(request):
    check = CSRFCheck(request)
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    if reason:
        raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)

class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        
        if header is None:
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE']) or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None
        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
            return user,validated_token
        except:
            response = Response()
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            