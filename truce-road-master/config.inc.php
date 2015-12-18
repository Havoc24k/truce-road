<?php
///////////////////
// ENV Variables //
///////////////////
define('LOCAL', true);
define('TEMPLATES_PATH', dirname(__FILE__).DIRECTORY_SEPARATOR.'templates');
define('JS_VIEWS_PATH', dirname(__FILE__).DIRECTORY_SEPARATOR.'js'.DIRECTORY_SEPARATOR.'views');
define('JS_MODELS_PATH', dirname(__FILE__).DIRECTORY_SEPARATOR.'js'.DIRECTORY_SEPARATOR.'models');
define('TEMPLATES_EXTENSION', 'tpl.html');
define('VERSION', '2.0.0');

///////////////
//AUTOLOADER //
///////////////
function autoload($className)
{
    $className = ltrim($className, '\\');
    $fileName  = '';
    $namespace = '';
    if ($lastNsPos = strrpos($className, '\\')) {
        $namespace = substr($className, 0, $lastNsPos);
        $className = substr($className, $lastNsPos + 1);
        $fileName  = str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
    }
    $fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';

    require_once $fileName;
}
spl_autoload_register('autoload');
///////////////

///////////////////////
// Exception Handler //
///////////////////////
function exceptionHandler($exception)
{
    error_log(print_r($exception, true));
}
set_exception_handler('exceptionHandler');
/////////////////////
