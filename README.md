
In order to install the project on your machine locally.

Start by cloning the project using the following command:

```git clone https://github.com/Souallet/di-ugo-fullstack.git```

## Backend 

Move to backend directory
```cd backend``` 

Install dependencies
```composer install```

Migrate the entity-based database
```php bin/console make:migration```
```php bin/console doctrine:migrations:migrate```

Import data from CSVs using the appropriate command
```php bin/console ugo:orders:import```

Start your application locally on he port 8080
```symfony server:start -d --port=8080```


## Front End 

Move to frontend directory
```cd frontend ```

Install dependencies
```npm i ```

If your backend is not running on port 8080 change the apiURL in the configuration file.
```/src/config/site.tsx```

Start your application locally
```npm run serve```

