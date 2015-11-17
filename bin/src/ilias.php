<?php
namespace bin\src;
//////////////////////////////
//          I.L.I.A.S       //
//          Last name       //
//          Is              //
//          A               //
//          Secret          //
//////////////////////////////
//        __i_[TT]__        //
//      )"(_)oooo(_)        //
//////////////////////////////

if (php_sapi_name() === 'cli') {
    class ILIAS
    {
        private $css_dummy_view_tpl;
        private $js_dummy_view_tpl;
        private $html_dummy_view_tpl;
        private $cwd;
        private $app_code_abs_path;

        public function __construct($arguments)
        {
            ///////////////////////////////////
            // get current working directory //
            ///////////////////////////////////
            $this->cwd = dirname(__FILE__);
            $_ENV['ilias_cwd'] = $this->cwd;

            /////////////////////////
            // setup app code path //
            /////////////////////////

            // get path parts
            $this->app_code_abs_path = explode(DIRECTORY_SEPARATOR, $this->cwd);

            // remove '/src'
            array_pop($this->app_code_abs_path);

            // remove '/bin'
            array_pop($this->app_code_abs_path);

            // re-assemble path
            $this->app_code_abs_path = implode(DIRECTORY_SEPARATOR, $this->app_code_abs_path);
            $_ENV['ilias_app_code_abs_path'] = $this->app_code_abs_path;

            ////////////////////////////////
            // include application config //
            ////////////////////////////////
            require_once $this->app_code_abs_path.'/config.inc.php';

            /////////////////////
            // setup filepaths //
            /////////////////////
            $this->css_dummy_view_tpl = $this->cwd.'/templates/dummy_view.css';
            $this->js_dummy_view_tpl = $this->cwd.'/templates/dummy_view.js';
            $this->html_dummy_view_tpl = $this->cwd.'/templates/dummy-view.tpl.html';

            ///////////////////////////////////////////
            // remove script name from the arguments //
            ///////////////////////////////////////////
            array_shift($arguments);

            //////////////////////////////////
            // turn everything to lowercase //
            //////////////////////////////////
            array_walk($arguments, function(&$arg) {
                $arg = trim(strtolower($arg));
            });

            /////////////////////////////
            // Start parsing arguments //
            /////////////////////////////

            /////////////////////////////
            // create view <view-name> //
            /////////////////////////////
            if ($arguments[0] === "create" &&
                $arguments[1] === "view" &&
                $arguments[2] !== "") {

                if ($this->createJsViewFile($arguments[2]) &&
                    $this->createTplViewFile($arguments[2]) &&
                    // $this->createCssViewFile($arguments[2]) &&
                    $this->createLESSViewFile($arguments[2])) {
                    echo 'View created succesfully.'.PHP_EOL;
                } else {
                    echo 'ILIAS messed up.'.PHP_EOL;
                }

                return true;
            }

            //////////////////////////////////
            // Create mobile project bundle //
            //////////////////////////////////
            if ($arguments[0] === "create" &&
                $arguments[1] === "mobile") {

                ////////////////////////////////////////
                // create mobile folder if not exists //
                ////////////////////////////////////////
                if (!is_dir('../www')) {
                    mkdir('../www');
                }

                /////////////////////////////////
                // Copy files to folder mobile //
                /////////////////////////////////
                $this->recurseCopy('../js/', '../www/js/');
                $this->recurseCopy('../css/', '../www/css/');
                $this->recurseCopy('../assets/', '../www/assets/');
                $this->recurseCopy('../templates/', '../www/templates/');

                /////////////////////////////////////////////
                // Render index.php and save as index.html //
                /////////////////////////////////////////////
                ob_start();
                include '../index.php';
                $index = trim(ob_get_contents());
                ob_end_clean();
                file_put_contents('../www/index.html', $index);

                return true;
            }

            /////////
            // ANT //
            /////////
            if ($arguments[0] === "ant") {
                $target = $arguments[1];

                if($this->ant($target)) {
                    echo "ant $target finished.".PHP_EOL;
                } else {
                    echo 'ILIAS messed up.'.PHP_EOL;
                }

                return true;
            }

            /////////////
            // HELP!!! //
            /////////////
            if ($arguments[0] === "-h" ||
                $arguments[0] === "--help") {
                echo '/////////////'.PHP_EOL;
                echo '  I.L.I.A.S'.PHP_EOL;
                echo '  __i_[TT]__'.PHP_EOL;
                echo ')"(_)oooo(_)'.PHP_EOL;
                echo '/////////////'.PHP_EOL;
                echo PHP_EOL;
                echo PHP_EOL;
                echo "Create View:".PHP_EOL;
                echo "    ilias create view view-name-with-dashes".PHP_EOL;
                echo PHP_EOL;
                echo "Create mobile project bundle:".PHP_EOL;
                echo "    ilias create mobile".PHP_EOL;
                echo PHP_EOL;
                echo "Invoke ANT:".PHP_EOL;
                echo "    ilias ant <target>".PHP_EOL;

                return true;
            }

            ////////////////////
            // Final solution //
            ////////////////////
            echo "Try: ilias -h".PHP_EOL;
            return true;
        }

        /**
         * [createJsViewFile description]
         * @param  [type] $viewname [description]
         * @return [type]           [description]
         */
        public function createJsViewFile($viewname)
        {
            $viewname = strtolower($viewname);
            if (strpos($viewname,'view') === false) {
                $container_name = $viewname.'-view';
            } else {
                $container_name = $viewname;
            }
            $view_file_name = str_replace('-', '_', $container_name).'.js';
            $StuldyViewName = $this->toCamelCase($container_name);
            $camelViewName = $this->toCamelCase($container_name, false);

            $view_tpl = file_get_contents($this->js_dummy_view_tpl);
            $view_tpl = str_replace('[VIEW_NAME]', $StuldyViewName, $view_tpl);
            $view_tpl = str_replace('[VIEW_CLASS_NAME]', $camelViewName, $view_tpl);
            $view_tpl = str_replace('[VIEW_CONTAINER_NAME]', $container_name, $view_tpl);
            $view_file_path = $this->app_code_abs_path.'/js/views/'.$view_file_name;

            if (is_file($view_file_path)) {
                echo 'JS view file already exists, override it [y/N]: ';
                if(strtolower(trim(fgets(STDIN))) !== 'y') {
                    return true;
                }
            }

            // file creation
            $res = file_put_contents($view_file_path, $view_tpl);
            if(!$res) {
                return false;
            }

            return true;
        }

        /**
         * [createJsViewFile description]
         * @param  [type] $viewname [description]
         * @return [type]           [description]
         */
        public function createTplViewFile($viewname)
        {
            $viewname = strtolower($viewname);
            if (strpos($viewname,'view') === false) {
                $container_name = $viewname.'-view';
            } else {
                $container_name = $viewname;
            }
            $view_file_name = $container_name.'.tpl.html';

            $view_tpl = file_get_contents($this->html_dummy_view_tpl);
            $view_tpl = str_replace('[VIEW_CONTAINER_NAME]', $container_name, $view_tpl);
            $view_file_path = $this->app_code_abs_path.'/templates/'.$view_file_name;

            if (is_file($view_file_path)) {
                echo 'Template view file already exists, override it [y/N]: ';
                if(strtolower(trim(fgets(STDIN))) !== 'y') {
                    return true;
                }
            }

            // file creation
            $res = file_put_contents($view_file_path, $view_tpl);
            if(!$res) {
                return false;
            }

            return true;
        }

        /**
         * [createCssViewFile description]
         * @param  [type] $viewname [description]
         * @return [type]           [description]
         */
        public function createCssViewFile($viewname)
        {
            $viewname = strtolower($viewname);
            if (strpos($viewname,'view') === false) {
                $container_name = $viewname.'-view';
            } else {
                $container_name = $viewname;
            }
            $view_file_name = str_replace('-', '_', $container_name).'.css';

            $view_tpl = file_get_contents($this->css_dummy_view_tpl);
            $view_tpl = str_replace('[VIEW_CONTAINER_NAME]', $container_name, $view_tpl);
            $view_file_path = $this->app_code_abs_path.'/css/'.$view_file_name;

            if (is_file($view_file_path)) {
                echo 'CSS view file already exists, override it [y/N]: ';
                if(strtolower(trim(fgets(STDIN))) !== 'y') {
                    return true;
                }
            }

            // file creation
            $res = file_put_contents($view_file_path, $view_tpl);
            if(!$res) {
                return false;
            }

            return true;
        }

        public function createLESSViewFile($viewname)
        {
            $viewname = strtolower($viewname);
            if (strpos($viewname,'view') === false) {
                $container_name = $viewname.'-view';
            } else {
                $container_name = $viewname;
            }
            $view_file_name = str_replace('-', '_', $container_name).'.less';

            $view_tpl = file_get_contents($this->css_dummy_view_tpl);
            $view_tpl = str_replace('[VIEW_CONTAINER_NAME]', $container_name, $view_tpl);
            $view_file_path = $this->app_code_abs_path.'/less/'.$view_file_name;

            if (is_file($view_file_path)) {
                echo 'CSS view file already exists, override it [y/N]: ';
                if(strtolower(trim(fgets(STDIN))) !== 'y') {
                    return true;
                }
            }

            // file creation
            $res = file_put_contents($view_file_path, $view_tpl);
            if(!$res) {
                return false;
            }

            return true;
        }

        /**
         * [antDBReset description]
         * @return [type] [description]
         */
        private function ant($target)
        {
            chdir("$this->app_code_abs_path/build/");
            $proc = popen("ant $target", 'r');
            while($line = fread($proc, 2096)) {
                echo $line;
            }
            pclose($proc);

            return true;
        }

        /**
         * [toCamelCase description]
         * @param  [type]  $string     [description]
         * @param  boolean $stuldyCaps [description]
         * @param  string  $delimiter  [description]
         * @return [type]              [description]
         */
        private function toCamelCase($string, $stuldyCaps = true, $delimiter = '-')
        {
            $string = explode($delimiter, $string);
            $string = array_map(ucfirst, $string);
            if(!$stuldyCaps) {
                $string[0] = strtolower($string[0]);
            }
            $string = implode('', $string);
            return $string;
        }

        /**
         * [recurseCopy description]
         * @param  [type] $src [description]
         * @param  [type] $dst [description]
         * @return [type]      [description]
         */
        private function recurseCopy($src, $dst)
        {
            $dir = opendir($src);
            @mkdir($dst);
            while(false !== ( $file = readdir($dir)) ) {
                if (( $file != '.' ) && ( $file != '..' )) {
                    if ( is_dir($src . '/' . $file) ) {
                        $this->recurseCopy($src . '/' . $file,$dst . '/' . $file);
                    }
                    else {
                        copy($src . '/' . $file, $dst . '/' . $file);
                    }
                }
            }
            closedir($dir);
        }
    }

    $ilias = new ILIAS($argv);
}
