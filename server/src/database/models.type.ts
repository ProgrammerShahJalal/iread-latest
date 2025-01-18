import * as ErrorTraceModel from "../modules/system_management/models/error_trace.model";
import * as ContactModel from "../modules/contact_management/models/model";

import * as BlogModel from "../modules/blog_management/models/model";
import * as BlogCategoriesModel from "../modules/blog_categories_management/models/model";
import * as BlogCategoryBlogModel from "../modules/blog_categories_management/models/blog_category_blog.model";
import * as BlogTagsModel from "../modules/blog_tags_management/models/model";

import * as BlogCommentModel from "../modules/blog_comment_management/models/model";
import * as BlogLikeModel from "../modules/blog_likes_management/models/model";
import * as BlogViewModel from "../modules/blog_view_management/models/model";

import * as AuthorModel from "../modules/author_management/models/model";

import * as EventModel from "../modules/event_management/models/model";
import * as EventCategoriesModel from "../modules/event_categories_management/models/model";
import * as EventTagsModel from "../modules/event_tags_management/models/model";

import * as DonationModel from "../modules/donation_management/models/model";

import * as AppSettingModel from "../modules/app_setting_management/models/model";
import * as AppSettingValuesModel from "../modules/app_setting_management/models/app_setting_values.model";

import * as AppSubscribersModel from "../modules/app_subscribers_management/models/model";

export type model_types = {
    ContactModel: typeof ContactModel.DataModel;
    ErrorTraceModel: typeof ErrorTraceModel.DataModel;
    
    BlogModel: typeof BlogModel.DataModel;
    BlogCategoriesModel: typeof BlogCategoriesModel.DataModel;
    BlogCategoryBlogModel: typeof BlogCategoryBlogModel.DataModel;
    BlogTagsModel: typeof BlogTagsModel.DataModel;


    BlogCommentModel: typeof BlogCommentModel.DataModel;
    BlogLikeModel: typeof BlogLikeModel.DataModel;
    BlogViewModel: typeof BlogViewModel.DataModel;
   
    AuthorModel: typeof AuthorModel.DataModel;

    EventModel: typeof EventModel.DataModel;
    EventCategoriesModel: typeof EventCategoriesModel.DataModel;
    EventTagsModel: typeof EventTagsModel.DataModel;

    DonationModel: typeof DonationModel.DataModel;

    AppSettingModel: typeof AppSettingModel.DataModel;
    AppSettingValuesModel: typeof AppSettingValuesModel.DataModel;

    AppSubscribersModel: typeof AppSubscribersModel.DataModel;
}