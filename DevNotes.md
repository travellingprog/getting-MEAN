# TO DO

* How do we tie Webpack into the backend?


# Backend Setup

The start point is **./bin/www**.

However the app is defined in **app.js**.

Minification and concatenation of client code is also defined in *app.js*. The result is saved under **public/angular/loc8r.min.js**.

Data models are defined in **./app_api/models/db**.

Routes are defined in **./app_server/routes/index**, except the API routes which are defined in **./app_api/routes/index**. API routes begin with `/api`. HOWEVER, ONLY THE API ROUTES ARE ACTUALLY USED IN THIS RELEASE OF THE APP.

Views are defined as Jade templates under **./app_server/views**.

Static content is served from the folders **./public** and **./app_client**.

The file **./app_client/index.html** seems to always be sent.
