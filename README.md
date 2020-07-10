# Tenmokenshi
###### A multi-purpose Discord bot!

![Tenmokenshi Logo](https://i.ibb.co/RCCRCB1/Tenmokenshi-Logo.png)

# Get started!
1. To get started, clone or download this repository!
2. Run npm install to install all the modules and their dependencies.
3. Create an .env file in the main directory.
4. Inside the .env file include these environment variables with your own keys! 

* BOT_TOKEN
* DB_HOST
* DB_USER
* DB_DATABASE
* TENOR_KEY
* TENOR_FILTER
* TENOR_LOCALE
* TENOR_MEDIA_FILTER
* TENOR_DATE_FORMAT
* TENOR_AR_RANGE
* OPENWEATHER_API_KEY
* WOLFRAMALPHA_API_KEY

# The MySQL database schema!
## Guild prefixes!
```sql
  CREATE TABLE guild_Prefixes (
    guild_id VARCHAR (20),
    guild_prefix CHAR (1)
  );
```
