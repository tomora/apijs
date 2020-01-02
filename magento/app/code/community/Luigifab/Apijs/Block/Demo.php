<?php
/**
 * Created D/20/11/2011
 * Updated S/03/12/2011
 * Version 2
 *
 * Copyright 2011 | Fabrice Creuzot (luigifab) <code~luigifab~info>
 * https://redmine.luigifab.info/projects/magento/wiki/apijs
 *
 * This program is free software, you can redistribute it or modify
 * it under the terms of the GNU General Public License (GPL) as published
 * by the free software foundation, either version 2 of the license, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but without any warranty, without even the implied warranty of
 * merchantability or fitness for a particular purpose. See the
 * GNU General Public License (GPL) for more details.
 */

class Luigifab_Apijs_Block_Demo extends Mage_Adminhtml_Block_Abstract implements Varien_Data_Form_Element_Renderer_Interface {

	protected $_template = 'apijs/demo.phtml';

	public function render(Varien_Data_Form_Element_Abstract $element) {
		return '<tr><td colspan="3">'.$this->toHtml().'</td></tr>';
	}
}