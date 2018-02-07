
             //班级
-            // .when('/platform/classes/:type', {
-            //     title: '平台班级',
-            //     templateUrl: 'class_list',
-            //     controller: 'classListController'
-            // })
-            // .when('/organization/classes/:type', {
-            //     title: '机构班级',
-            //     templateUrl: 'class_list',
-            //     controller: 'classListController'
-            // })
-            // .when('/platform/class/:classId/detail', {
-            //     title: '班级详情',
-            //     templateUrl: 'class_detail',
-            //     controller: 'classDetailController'
-            // })
-            // .when('/organization/class/:classId/detail', {
-            //     title: '班级详情',
-            //     templateUrl: 'class_detail',
-            //     controller: 'classDetailController',
-            //     funcCodes: 'Organization_Classes_All_Detail,Organization_Classes_My_Detail,Organization_Classes_Group_Detail'
-            // })
-            // .when('/platform/class/:classId?', {
-            //     title: '创建班级',
-            //     templateUrl: 'class',
-            //     controller: 'classController',
-            // })
-            // .when('/organization/class/:classId?', {
-            //     title: '创建班级',
-            //     templateUrl: 'class',
-            //     controller: 'classController',
-            // })
-            // .when('/platform/course/:courseId/classes', {
-            //     title: '子班管理',
-            //     templateUrl: 'course_classes',
-            //     controller: 'courseClassesController',
-            // })
-            // .when('/organization/course/:courseId/classes', {
-            //     title: '子班管理',
-            //     templateUrl: 'course_classes',
-            //     controller: 'courseClassesController',
-            // })
-            // .when('/platform/class/:classId/schedule', {
-            //     title: '班级大纲',
-            //     templateUrl: 'views_class_schedule',
-            //     controller: 'classScheduleController',
-            //     funcCodes: 'Platform_Classes_Class_Update_Schedule'
-            // })
-            // .when('/organization/class/:classId/schedule', {
-            //     title: '班级大纲',
-            //     templateUrl: 'views_class_schedule',
-            //     controller: 'classScheduleController',
-            //     funcCodes: 'Organization_Classes_All_Schedule_Query,Organization_Classes_My_Schedule_Query,Organization_Classes_Group_Schedule_Query'
-            // })
-            // .when('/organization/class/:classId/packages', {
-            //     title: '强化包',
-            //     templateUrl: 'class_package_list',
-            //     controller: 'classPackageListController',
-            //     //funcCodes: 'Organization_Classes_All_Schedule_Query,Organization_Classes_My_Schedule_Query,Organization_Classes_Group_Schedule_Query'
-            // })
-            // .when('/organization/class/:classId/classService', {
-            //     title: '班级服务',
-            //     templateUrl: 'classServiceView',
-            //     controller: 'classServiceController',
-            // })
-            // .when('/organization/class/:classId/billBoard', {
-            //     title: '班级公告',
-            //     templateUrl: 'billBoard',
-            //     controller: 'billBoardController'
-            // })
-            // .when('/organization/classes/:classId/students', {
-            //     title: '学员管理',
-            //     templateUrl: 'student_list',
-            //     controller: 'studentController',
-            //     funcCodes: 'Organization_Classes_All_Students,Organization_Classes_My_Students,Organization_Classes_Group_Students',
-            // })
+            .when('/v2/platform/classes/:type', {
+                title: '平台班级',
+                templateUrl: 'class_list',
+                controller: 'classListController'
+            })
+            .when('/v2/organization/classes/:type', {
+                title: '机构班级',
+                templateUrl: 'class_list',
+                controller: 'classListController'
+            })
+            .when('/v2/platform/class/:classId/detail', {
+                title: '班级详情',
+                templateUrl: 'class_detail',
+                controller: 'classDetailController'
+            })
+            .when('/v2/organization/class/:classId/detail', {
+                title: '班级详情',
+                templateUrl: 'class_detail',
+                controller: 'classDetailController',
+                funcCodes: 'Organization_Classes_All_Detail,Organization_Classes_My_Detail,Organization_Classes_Group_Detail'
+            })
+            .when('/v2/platform/class/:classId?', {
+                title: '创建班级',
+                templateUrl: 'class',
+                controller: 'classController',
+            })
+            .when('/v2/organization/class/:classId?', {
+                title: '创建班级',
+                templateUrl: 'class',
+                controller: 'classController',
+            })
+            .when('/v2/platform/course/:courseId/classes', {
+                title: '子班管理',
+                templateUrl: 'course_classes',
+                controller: 'courseClassesController',
+            })
+            .when('/v2/organization/course/:courseId/classes', {
+                title: '子班管理',
+                templateUrl: 'course_classes',
+                controller: 'courseClassesController',
+            })
+            .when('/v2/platform/class/:classId/schedule', {
+                title: '班级大纲',
+                templateUrl: 'views_class_schedule',
+                controller: 'classScheduleController',
+                funcCodes: 'Platform_Classes_Class_Update_Schedule'
+            })
+            .when('/v2/organization/class/:classId/schedule', {
+                title: '班级大纲',
+                templateUrl: 'views_class_schedule',
+                controller: 'classScheduleController',
+                funcCodes: 'Organization_Classes_All_Schedule_Query,Organization_Classes_My_Schedule_Query,Organization_Classes_Group_Schedule_Query'
+            })
+            .when('/v2/organization/class/:classId/packages', {
+                title: '强化包',
+                templateUrl: 'class_package_list',
+                controller: 'classPackageListController',
+                //funcCodes: 'Organization_Classes_All_Schedule_Query,Organization_Classes_My_Schedule_Query,Organization_Classes_Group_Schedule_Query'
+            })
+            .when('/v2/organization/class/:classId/classService', {
+                title: '班级服务',
+                templateUrl: 'classServiceView',
+                controller: 'classServiceController',
+            })
+            .when('/v2/organization/class/:classId/billBoard', {
+                title: '班级公告',
+                templateUrl: 'billBoard',
+                controller: 'billBoardController'
+            })
+            .when('/v2/organization/classes/:classId/students', {
+                title: '学员管理',
+                templateUrl: 'student_list',
+                controller: 'studentController',
+                funcCodes: 'Organization_Classes_All_Students,Organization_Classes_My_Students,Organization_Classes_Group_Students',
+            })


             //   .when('/organization/classes/:classId/student/data', {
             //       title: '查看学习数据',
             //       templateUrl: 'learndata_list',
@@ -150,33 +150,33 @@
             //     controller: 'classMenteeScheduleController',
             //     //funcCodes: 'Organization_View_Student_ReserveCalendar_All,Organization_View_Student_ReserveCalendar_Group,Organization_View_Student_ReserveCalendar_My',
             // })
-            // .when('/platform/class/:classId/basicservice', {
-            //     title: '班级服务管理',
-            //     templateUrl: 'class_basic_service',
-            //     controller: 'classBasicServiceController',
-            // })
-            // .when('/organization/class/:classId/basicservice', {
-            //     title: '班级服务管理',
-            //     templateUrl: 'class_basic_service',
-            //     controller: 'classBasicServiceController',
-            //     funcCodes: 'Organization_Classes_All_BasicServices,Organization_Classes_My_BasicServices,Organization_Classes_Group_BasicServices'
-            // })
-            // .when('/organization/classes/teachers/add', {
-            //     title: '批量添加教员',
-            //     templateUrl: 'classes_teachers_add',
-            //     controller: 'classesTeachersAddController',
-            //     //funcCodes: 'Organization_Classes_All_BasicServices,Organization_Classes_My_BasicServices,Organization_Classes_Group_BasicServices'
-            // })
-            // .when('/organization/class/:classId/testing', {
-            //     title: '测试内容管理',
-            //     templateUrl: 'class_testing_management',
-            //     controller: 'classTestingManagementController',
-            // })
-            // .when('/organization/class/:classId/handout_library', {
-            //     title: '讲义库管理',
-            //     templateUrl: 'class_handout_library_management',
-            //     controller: 'classHandoutLibraryManagementController',
-            // })
+            .when('/v2/platform/class/:classId/basicservice', {
+                title: '班级服务管理',
+                templateUrl: 'class_basic_service',
+                controller: 'classBasicServiceController',
+            })
+            .when('/v2/organization/class/:classId/basicservice', {
+                title: '班级服务管理',
+                templateUrl: 'class_basic_service',
+                controller: 'classBasicServiceController',
+                funcCodes: 'Organization_Classes_All_BasicServices,Organization_Classes_My_BasicServices,Organization_Classes_Group_BasicServices'
+            })
+            .when('/v2/organization/classes/teachers/add', {
+                title: '批量添加教员',
+                templateUrl: 'classes_teachers_add',
+                controller: 'classesTeachersAddController',
+                //funcCodes: 'Organization_Classes_All_BasicServices,Organization_Classes_My_BasicServices,Organization_Classes_Group_BasicServices'
+            })
+            .when('/v2/organization/class/:classId/testing', {
+                title: '测试内容管理',
+                templateUrl: 'class_testing_management',
+                controller: 'classTestingManagementController',
+            })
+            .when('/v2/organization/class/:classId/handout_library', {
+                title: '讲义库管理',
+                templateUrl: 'class_handout_library_management',
+                controller: 'classHandoutLibraryManagementController',
+            })

             // //机构用户
             //  .when('/organization/authority/users', {
@@ -271,49 +271,49 @@
             })

             //课程
-            // .when('/platform/courses/:type', {
-            //     title: '所有课程',
-            //     templateUrl: 'course_list',
-            //     controller: 'courseListController',
-            // })
-            // .when('/organization/courses/:type', {
-            //     title: '机构课程',
-            //     templateUrl: 'course_list',
-            //     controller: 'courseListController',
-            // })
-            // .when('/platform/course/:courseId?', {
-            //     title: '课程基本信息',
-            //     templateUrl: 'course',
-            //     controller: 'courseController',
-            // })
-            // .when('/organization/course/:courseId?', {
-            //     title: '课程基本信息',
-            //     templateUrl: 'course',
-            //     controller: 'courseController',
-            //     funcCodes: 'Organization_Courses_All_BasicInfo,Organization_Courses_My_BasicInfo,Organization_Courses_Group_BasicInfo',
-            // })
-            // .when('/platform/course/:courseId/detail', {
-            //     title: '课程详情',
-            //     templateUrl: 'course_detail',
-            //     controller: 'courseDetailController',
-            // })
-            // .when('/organization/course/:courseId/detail', {
-            //     title: '课程详情',
-            //     templateUrl: 'course_detail',
-            //     controller: 'courseDetailController',
-            //     funcCodes: 'Organization_Courses_All_Detail,Organization_Courses_My_Detail,Organization_Courses_Group_Detail',
-            // })
-            // .when('/platform/course/:courseId/schedule', {
-            //     title: '课程大纲',
-            //     templateUrl: 'course_schedule',
-            //     controller: 'courseScheduleController',
-            // })
-            // .when('/organization/course/:courseId/schedule', {
-            //     title: '课程大纲',
-            //     templateUrl: 'course_schedule',
-            //     controller: 'courseScheduleController',
-            //     funcCodes: 'Organization_Courses_All_Schedule,Organization_Courses_My_Schedule,Organization_Courses_Group_Schedule',
-            // })
+            .when('/v2/platform/courses/:type', {
+                title: '所有课程',
+                templateUrl: 'course_list',
+                controller: 'courseListController',
+            })
+            .when('/v2/organization/courses/:type', {
+                title: '机构课程',
+                templateUrl: 'course_list',
+                controller: 'courseListController'
+            })
+            .when('/v2/platform/course/:courseId?', {
+                title: '课程基本信息',
+                templateUrl: 'course',
+                controller: 'courseController',
+            })
+            .when('/v2/organization/course/:courseId?', {
+                title: '课程基本信息',
+                templateUrl: 'course',
+                controller: 'courseController',
+                funcCodes: 'Organization_Courses_All_BasicInfo,Organization_Courses_My_BasicInfo,Organization_Courses_Group_BasicInfo',
+            })
+            .when('/v2/platform/course/:courseId/detail', {
+                title: '课程详情',
+                templateUrl: 'course_detail',
+                controller: 'courseDetailController',
+            })
+            .when('/v2/organization/course/:courseId/detail', {
+                title: '课程详情',
+                templateUrl: 'course_detail',
+                controller: 'courseDetailController',
+                funcCodes: 'Organization_Courses_All_Detail,Organization_Courses_My_Detail,Organization_Courses_Group_Detail',
+            })
+            .when('/v2/platform/course/:courseId/schedule', {
+                title: '课程大纲',
+                templateUrl: 'course_schedule',
+                controller: 'courseScheduleController',
+            })
+            .when('/v2/organization/course/:courseId/schedule', {
+                title: '课程大纲',
+                templateUrl: 'course_schedule',
+                controller: 'courseScheduleController',
+                funcCodes: 'Organization_Courses_All_Schedule,Organization_Courses_My_Schedule,Organization_Courses_Group_Schedule',
+            })
             // .when('/platform/organization/all', {
             //     title: '机构管理',
             //     templateUrl: 'organization_list',
@@ -547,8 +547,8 @@
     }])

     // 预约路由
-    // .config(['$routeProvider', function ($routeProvider) {
-    //     $routeProvider
+    .config(['$routeProvider', function ($routeProvider) {
+        $routeProvider
     //         .when('/organization/reservation/teachers', {
     //             title: '直播课老师',
     //             templateUrl: 'reservation_teachers_view',
@@ -763,46 +763,46 @@
     //             controller: 'cctalkGroupMemberController'
     //         })
     //         //助教质检工作台
-    //         .when('/organization/quality/platform', {
-    //             title: '助教质检工作台-首页',
-    //             templateUrl: 'quality_platform_view',
-    //             controller: 'qualityPlatformCollection',
-    //             //  funcCodes: 'QC_Platform_Home',
-    //         })
-    //         .when('/organization/quality/package/:packId', {
-    //             title: '质检包详情',
-    //             templateUrl: 'quality_package_view',
-    //             controller: 'qualityPackageCollection',
-    //             // funcCodes: 'QC_Package',
-    //         })
-    //          .when('/organization/packId/:packId/singleId/:singleId/questionId/:questionId/qualityType/:qualityType/sourceType/:sourceType', {
-    //              title: '质检评分',
-    //              templateUrl: 'quality_score_view',
-    //              controller: 'qualityScoreCollection',
-    //              //funcCodes: 'QC_Score',
-    //          })
-    //         .when('/organization/quality/single', {
-    //             title: '质检单列表',
-    //             templateUrl: 'quality_single_view',
-    //             controller: 'qualitySingleCollection',
-    //             // funcCodes: 'QC_Single',
-    //         })
-       //     .when('/organization/quality/score', {
-       //         title: '助教质量评分',
-       //         templateUrl: 'question_score_view',
-       //         controller: 'questionScoreCollection',
-       //     })
-    //        .when('/organization/tutor/score', {
-    //            title: '助教个人中心-质量评分',
-    //            templateUrl: 'tutor_score_view',
-    //            controller: 'tutorScoreCollection',
-    //        })
-    //      .when('/organization/tutor/platform', {
-    //          title: '助教个人中心-已质检单',
-    //          templateUrl: 'quality_assistant_single_view',
-    //          controller: 'qualityAssistantSingleConllection',
-    //          //funcCodes: 'Tutor_Quality_Inspection',
-    //      })
+            .when('/v2/organization/quality/platform', {
+                title: '助教质检工作台-首页',
+                templateUrl: 'quality_platform_view',
+                controller: 'qualityPlatformCollection',
+                //  funcCodes: 'QC_Platform_Home',
+            })
+            .when('/v2/organization/quality/package/:packId', {
+                title: '质检包详情',
+                templateUrl: 'quality_package_view',
+                controller: 'qualityPackageCollection',
+                // funcCodes: 'QC_Package',
+            })
+             .when('/v2/organization/packId/:packId/singleId/:singleId/questionId/:questionId/qualityType/:qualityType/sourceType/:sourceType', {
+                 title: '质检评分',
+                 templateUrl: 'quality_score_view',
+                 controller: 'qualityScoreCollection',
+                 //funcCodes: 'QC_Score',
+             })
+            .when('/v2/organization/quality/single', {
+                title: '质检单列表',
+                templateUrl: 'quality_single_view',
+                controller: 'qualitySingleCollection',
+                // funcCodes: 'QC_Single',
+            })
+            .when('/v2/organization/quality/score', {
+                title: '助教质量评分',
+                templateUrl: 'question_score_view',
+                controller: 'questionScoreCollection',
+            })
+            .when('/v2/organization/tutor/score', {
+                title: '助教个人中心-质量评分',
+                templateUrl: 'tutor_score_view',
+                controller: 'tutorScoreCollection',
+            })
+            .when('/v2/organization/tutor/platform', {
+                title: '助教个人中心-已质检单',
+                templateUrl: 'quality_assistant_single_view',
+                controller: 'qualityAssistantSingleConllection',
+                // funcCodes: 'Tutor_Quality_Inspection',
+            })
     //         //Costalk场景管理
     //      .when('/organization/costalk/platform', {
     //          title: 'Costalk场景',
@@ -841,7 +841,7 @@
     //         controller: 'test_project_widget_Controller',
     //     })
     //     ;
-    // }])
+    }])

     .config(['dialogsProvider', '$translateProvider', 'tmhDynamicLocaleProvider',
         function (dialogsProvider, $translateProvider, tmhDynamicLocaleProvider) {
(END)


// +代表当前分支比master多的
// -代表比master少的


feature/teacher-CJW-2917 班级课程迁移   统计出来哪些页面已经迁移了
旭谦
v3/api/class||course


'api/courses/xxxxx'
api.getV3Url('course/v1/courses/xxxx')





class
classBasicService
classDetail
classesTeachersAdd
classHandoutLibraryManagement
classList
classPackageList
classSchedule
classService
classTestingManagement
course
courseClasses
courseDetail
courseList
courseSchedule
=


classLocationManagement.js  ?
classManage.js    ?

classMenteeSchedule.js   ?
--


billBoard
student




刘换，张涛产品，旭谦，磊哥

app\platform\controllers\class.js(567):        $http.post('/api/courses/organization/pager', { organizationId: data.orgId, pageSize: 200, pageNumber: 1 }) //api.getV3Url('class/v1/courses/organization/pager'),
app\platform\controllers\class.js(583):            $http.get('/api/courses', { params: { courseId: id } })     //api.getV3Url('class/v1/courses'),

app\platform\controllers\classDetail.js(313):                   $http.get('/api/upload/token').success(function (d) {   //default/v1/upload/token'

app\platform\controllers\classSchedule.js(864):        $http.get('/api/courses/coursewareLibraries', {    //class/v1/courses/coursewareLibraries
app\platform\controllers\classSchedule.js(910):                $http.get('/api/courses/coursewares', {    //class/v1/courses/coursewares

app\platform\controllers\courseList.js(150):            $http.post('/api/courses/copy', {            // $http.post(api.getV3Url('course/v1/courses/copy'), {
app\platform\controllers\courseList.js(180):            $http.post('api/courses/logs/pager', {       // $http.post(api.getV3Url('course/v1/courses/logs/pager'),

app\platform\controllers\courseDetail.js(275):                    $http.get('/api/upload/token').success(function (d) {   // api.getV3Url('default/v1/upload/token')

app\platform\controllers\courseSchedule.js(934):        $http.get('/api/courses/coursewareLibraries', {   //'course/v1/courses/coursewareLibraries'
app\platform\controllers\courseSchedule.js(980):                $http.get('/api/courses/coursewares', {   //'course/v1/courses/coursewares'
app\platform\controllers\courseSchedule.js(1050):        $http.get('/api/courses/coursewareLibraries', {   //course/v1/courses/coursewareLibraries'
app\platform\controllers\courseSchedule.js(1091):            $http.get('/api/courses/coursewares', {       //'course/v1/courses/coursewares'
app\platform\controllers\courseSchedule.js(1117):            $http.post('/api/courses/lessons', {         // course/v1/courses/lessons'
app\platform\controllers\courseSchedule.js(1606):                $http.post('/api/courses/relate/cancel', {      //course/v1/courses/relate/cancel














张涛-产品 <Jeet.zhang@hujiang.com>
续谦-产品技术 <Steven.xu@hujiang.com>
刘焕 <liuhuan@hujiang.com>
徐磊-产品技术 <Walter.xu@hujiang.com>