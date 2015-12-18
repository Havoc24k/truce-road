<?php
namespace application\modules;

use application\core\App as App;

/**
 * TemplateLoader class
 */
class TemplateLoader
{
    private $templateFiles;
    private $templates;
    private $sections;
    private $js_views;
    private $js_models;

    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->discoverTemplates();
        $this->discoverModels();
        $this->discoverViews();
    }

    /**
     * [insertTemplates description]
     * @return [type] [description]
     */
    public function insertTemplates()
    {
        return $this->templates;
    }

    /**
     * [insertSections description]
     * @return [type] [description]
     */
    public function insertSections()
    {
        return $this->sections;
    }

    /**
     * [insertJsViews description]
     * @return [type] [description]
     */
    public function insertJsViews()
    {
        return $this->js_views;
    }

    /**
     * [insertJsModels description]
     * @return [type] [description]
     */
    public function insertJsModels()
    {
        return $this->js_models;
    }

    /**
     * [discoverTemplates description]
     * @return [type] [description]
     */
    private function discoverTemplates()
    {
        foreach (App::$views as $tpl_name) {
            $templatePath = TEMPLATES_PATH . DIRECTORY_SEPARATOR . $tpl_name . '.' . TEMPLATES_EXTENSION;
            $this->template_files[] = $templatePath;
            $this->templates.= file_get_contents($templatePath) . PHP_EOL;
            $this->sections.= $this->createSectionHTML($templatePath);
        }
    }

    /**
     * [discoverViews description]
     * @return [type] [description]
     */
    private function discoverViews()
    {
        foreach (glob(JS_VIEWS_PATH . DIRECTORY_SEPARATOR . '*.js') as $viewPath) {
            $js_view_file = explode(DIRECTORY_SEPARATOR, $viewPath);
            $js_view_file = implode('/', array_slice($js_view_file, -3, 3));
            $this->js_views.= $this->createJsTag($js_view_file);
        }
    }

    /**
     * [discoverModels description]
     * @return [type] [description]
     */
    private function discoverModels()
    {
        foreach (glob(JS_MODELS_PATH . DIRECTORY_SEPARATOR . '*.js') as $modelPath) {
            $js_model_file = explode(DIRECTORY_SEPARATOR, $modelPath);
            $js_model_file = implode('/', array_slice($js_model_file, -3, 3));
            $this->js_models.= $this->createJsTag($js_model_file);
        }
    }

    /**
     * [createSectionHTML description]
     * @param  [type] $templatePath [description]
     * @return [type] [description]
     */
    private function createSectionHTML($templatePath)
    {
        $templateName = explode('.', basename($templatePath));
        $templateId = $templateName = $templateName[0];
        $templateClass = str_replace('_', '-', $templateId);

        $html = "<section id='$templateId' class='$templateClass'></section>" . PHP_EOL;

        return $html;
    }

    /**
     * [createJsTag description]
     * @param  [type] $rel_filepath [description]
     * @return [type] [description]
     */
    private function createJsTag($rel_filepath)
    {
        $tag = "<script type='text/javascript' src='$rel_filepath'></script>".PHP_EOL;

        return $tag;
    }
}
