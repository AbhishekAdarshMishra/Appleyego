const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Router Paths

const admin_register_Routes = require("./api/routes/admin_register");
const admin_login_Routes = require("./api/routes/admin_login");
const get_admin_user_Routes = require("./api/routes/get_admin_user");
const get_admin_user_email_Routes = require("./api/routes/get_admin_user_email");
const search_admin_user_name_Routes = require("./api/routes/search_admin_user_name");
const update_admin_Routes = require("./api/routes/update_admin");
const image_admin_Routes = require("./api/routes/image_admin");

const guest_register_Routes = require("./api/routes/guest_register");
const guest_login_Routes = require("./api/routes/guest_login");
const get_guest_user_Routes = require("./api/routes/get_guest_user");
const get_guest_user_email_Routes = require("./api/routes/get_guest_user_email");
const search_guest_user_name_Routes = require("./api/routes/search_guest_user_name");
const update_guest_Routes = require("./api/routes/update_guest");
const image_guest_Routes = require("./api/routes/image_guest");

const post_Routes = require("./api/routes/post/post");
const get_post_Routes = require("./api/routes/post/get_post");
const get_post_id_Routes = require("./api/routes/post/get_post_id");
const get_post_category_Routes = require("./api/routes/post/get_post_category");
const get_post_category_class_Routes = require("./api/routes/post/get_post_category_class");
const get_post_category_author_Routes = require("./api/routes/post/get_post_category_author");
const get_post_category_author_class_Routes = require("./api/routes/post/get_post_category_author_class");
const search_category_class_Routes = require("./api/routes/post/search_category_class");
const search_category_title_Routes = require("./api/routes/post/search_category_title");
const search_class_Routes = require("./api/routes/post/search_class");
const search_title_Routes = require("./api/routes/post/search_title");
const update_post_Routes = require("./api/routes/post/update_post");
const image_post_Routes = require("./api/routes/post/image_post");

const category_Routes = require("./api/routes/webApp/category");
const setting_Routes = require("./api/routes/webApp/setting");
const slider_Routes = require("./api/routes/webApp/slider");
const ads_Routes = require("./api/routes/webApp/ads");
const notification_Routes = require("./api/routes/webApp/notification");
const footer_Routes = require("./api/routes/webApp/footer");
const update_category_Routes = require("./api/routes/webApp/update_category");
const update_setting_Routes = require("./api/routes/webApp/update_setting");
const update_slider_Routes = require("./api/routes/webApp/update_slider");
const update_ads_Routes = require("./api/routes/webApp/update_ads");
const update_notification_Routes = require("./api/routes/webApp/update_notification");
const update_footer_Routes = require("./api/routes/webApp/update_footer");
const image_ads_Routes = require("./api/routes/webApp/image_ads");
const image_slider_Routes = require("./api/routes/webApp/image_slider");
const image_setting_Routes = require("./api/routes/webApp/image_setting");

//MongoDB Path
const mongodbPath = "mongodb://localhost/appleyego";
const mongodbAtlas =
  "mongodb+srv://Abhi:" +
  process.env.MONGO_PASS +
  "@cluster0.gedfx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// "mongodb+srv://Abhi:" +
// process.env.MONGO_PASS +
// "@appleyegocluster.kjyat.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(mongodbAtlas, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//Api call
app.use("/admin_register", admin_register_Routes);
app.use("/admin_login", admin_login_Routes);
app.use("/get_admin_user", get_admin_user_Routes);
app.use("/get_admin_user_email", get_admin_user_email_Routes);
app.use("/search_admin_user_name", search_admin_user_name_Routes);
app.use("/update_admin", update_admin_Routes);
app.use("/image_admin", image_admin_Routes);

app.use("/guest_register", guest_register_Routes);
app.use("/guest_login", guest_login_Routes);
app.use("/get_guest_user", get_guest_user_Routes);
app.use("/get_guest_user_email", get_guest_user_email_Routes);
app.use("/search_guest_user_name", search_guest_user_name_Routes);
app.use("/update_guest", update_guest_Routes);
app.use("/image_guest", image_guest_Routes);

app.use("/post", post_Routes);
app.use("/get_post", get_post_Routes);
app.use("/get_post_id", get_post_id_Routes);
app.use("/get_post_category", get_post_category_Routes);
app.use("/get_post_category_class", get_post_category_class_Routes);
app.use("/get_post_category_author", get_post_category_author_Routes);
app.use(
  "/get_post_category_author_class",
  get_post_category_author_class_Routes
);
app.use("/search_category_class", search_category_class_Routes);
app.use("/search_category_title", search_category_title_Routes);
app.use("/search_class", search_class_Routes);
app.use("/search_title", search_title_Routes);
app.use("/update_post", update_post_Routes);
app.use("/image_post", image_post_Routes);

app.use("/category", category_Routes);
app.use("/setting", setting_Routes);
app.use("/slider", slider_Routes);
app.use("/ads", ads_Routes);
app.use("/notification", notification_Routes);
app.use("/footer", footer_Routes);
app.use("/update_category", update_category_Routes);
app.use("/update_setting", update_setting_Routes);
app.use("/update_slider", update_slider_Routes);
app.use("/update_ads", update_ads_Routes);
app.use("/update_notification", update_notification_Routes);
app.use("/update_footer", update_footer_Routes);
app.use("/image_ads", image_ads_Routes);
app.use("/image_setting", image_setting_Routes);
app.use("/image_slider", image_slider_Routes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
