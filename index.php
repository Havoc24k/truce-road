<?php
    session_start();
    require_once dirname(__FILE__).DIRECTORY_SEPARATOR.'config.inc.php';
    require_once dirname(__FILE__).DIRECTORY_SEPARATOR.'views.php';
    $loader = new application\modules\TemplateLoader();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <!-- WARNING: for iOS 7, remove the width=device-width and height=device-height attributes. See https://issues.apache.org/jira/browse/CB-4323 -->
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
    <title>True Road</title>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="css/foundation.min.css" />
    <link rel="stylesheet" type="text/css" href="css/pageslider.css">
    <link rel="stylesheet" type="text/css" href="css/animate.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/header_view.css">
    <!--  -->

    <!-- Libraries -->
    <script type="text/javascript" src="js/libs/jquery.min.js"></script>
    <script type="text/javascript" src="js/libs/underscore.js"></script>
    <script type="text/javascript" src="js/libs/underscore.string.js"></script>
    <script type="text/javascript" src="js/libs/fastclick.js"></script>
    <script type="text/javascript" src="js/libs/pageslider.js"></script>
    <script type="text/javascript" src="js/libs/foundation.min.js"></script>
    <script type="text/javascript" src="js/libs/modernizr.js"></script>
    <!-- -->

    <!-- Core files -->
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/cookies.js"></script>
    <script type="text/javascript" src="js/registry.js"></script>
    <script type="text/javascript" src="js/views.js"></script>
    <script type="text/javascript" src="js/utils.js"></script>
    <script type="text/javascript" src="js/api.js"></script>
    <script type="text/javascript" src="js/template_engine.js"></script>
    <script type="text/javascript" src="js/router.js"></script>
    <!-- -->

    <!-- Models -->
    <?php echo $loader->insertJsModels(); ?>
    <!-- -->

    <!-- Views -->
    <?php echo $loader->insertJsViews(); ?>
    <!-- -->

    <!-- Main application file, always put last -->
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body>
    <div class="container">
        <!-- Templates -->
        <?php echo $loader->insertTemplates(); ?>
        <!-- Sections -->
        <?php echo $loader->insertSections(); ?>
    </div>
</body>
</html>
