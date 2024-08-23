from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TokenPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user_data = {
            'id': self.user.id,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'email': self.user.email
        }
        
        for key, value in user_data.items():
            data[key] = value

        return data

