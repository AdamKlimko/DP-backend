# Matador ERP
Tento repozitár obsahuje serverovú aplikáciu postavenú na technológiách Node.js a Express.js pre systém Matador-ERP. Aplikácia je súčasťou diplomovej práce „Inovatívny prístup analýzy a spracovania dát V ERP systéme".

# Inštalácia
## Serverová aplikácia
1. V ľubovoľnom adresári spustíme pomocou príkazového riadku príkaz na naklonovanie repozitáru

```bash
git clone https://github.com/AdamKlimko/DP-backend.git
```

2. V novovzniknutom adresári spustíme nasledovné príkazy na nainštalovanie potrebných dependencies.

```bash
npm update
npm install
```

## Databáza
3. Podľa stránky https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/ nainštalujeme databázový systém MongoDB ako windows service.

4. Stiahneme program MongoDBCompass: https://www.mongodb.com/docs/compass/master/install/

5. Ak nechceme použiť MongoDB autentifikáciu na prístup k databáze, zmažeme nasledovný kód zo súboru /src/config/config.js
```json
41      auth: {
42        user: envVars.MONGODB_USER,
43        password: envVars.MONGODB_PWD,
44      },
```

6. V MongoDBCompass vytvoríme novú databázu s kolekciou users podľa návodu https://www.mongodb.com/docs/compass/current/databases/

7. Do kolekcie user vložíme používateľa (heslo = "admin")
```json
{
  "role": "admin",
  "isEmailVerified": true,
  "name": "admin",
  "email": "admin@admin.com",
  "password": "$2a$08$lHHpR520G97Q2.POWoK1f.jurvmYveAntaaRPy6D6sTiGH1EbRS9q",
}
```

8. V koreňovej zložke projektu vytvoríme súbor .env a vložíme doňho:
```env
# Cislo portu kde bude bezat server
PORT=3000

# Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/matador-erp
# Ak pouzivame autentifikaciu nastavime usera
MONGODB_USER=meno
MONGODB_PWD=heslo

# JWT
# JWT secret key
JWT_SECRET=JwtSecret
JWT_ACCESS_EXPIRATION_MINUTES=1440
JWT_REFRESH_EXPIRATION_DAYS=30
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

```

9. Spustime server prikazom
```bash
npm start
```
