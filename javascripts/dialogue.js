/**
 * Created D/12/04/2009
 * Updated J/10/03/2011
 * Version 107
 *
 * Copyright 2008-2011 | Fabrice Creuzot (luigifab) <code~luigifab~info>
 * http://www.luigifab.info/apijs
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

function Dialogue() {

	// définition des attributs
	this.offset = 0;
	this.hiddenPage = false;
	this.dialogType = null;

	this.image = null;
	this.timer = null;
	this.callback = null;
	this.params = null;

	this.fragment = null;
	this.elemA = null;
	this.elemB = null;
	this.elemC = null;
	this.elemD = null;


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DÉFINITION DES BOITES DE DIALOGUE (8)

	// #### Dialogue d'information ################################# i18n ## debug ## public ### //
	// = révision : 72
	// » Permet d'afficher un message d'information à l'intention de l'utilisateur
	// » Composé d'un titre, d'un paragraphe, et d'un bouton de dialogue (Ok)
	// » Fermeture par bouton Ok ou touche Échap
	// » Auto-focus sur le bouton Ok
	this.dialogInformation = function (title, text, icon) {

		// *** Création de la boite de dialogue ***************** //
		if ((typeof title === 'string') && (typeof text === 'string')) {

			this.setupDialogue('information', icon);

			this.htmlParent(false);
			this.htmlTitle(title);
			this.htmlParagraph(text);
			this.htmlButtonOk();

			this.showDialogue();
			document.getElementById('box').lastChild.lastChild.focus();
		}

		// *** Message de debug ********************************* //
		else if (apijs.config.debug) {

			this.dialogInformation(apijs.i18n.translate('debugInvalidCall'), '[pre]TheDialogue » dialogInformation[br]➩ (string) title : ' + title + '[br]➩ (string) text : ' + text + '[br]➩ (string) icon : ' + icon + '[/pre]');
		}
	};


	// #### Dialogue de confirmation ############################### i18n ## debug ## public ### //
	// = révision : 75
	// » Permet de demander une confirmation à l'utilisateur
	// » Composé d'un titre, d'un paragraphe, et de deux boutons de dialogue (Annuler et Valider)
	// » Par la suite peut également être composé d'un lien différé de 5 secondes
	// » Fermeture par bouton Annuler ou touche Échap tant que le dialogue n'est pas validé
	// » Auto-focus sur le bouton Valider
	this.dialogConfirmation = function (title, text, callback, params, icon) {

		// *** Création de la boite de dialogue ***************** //
		if ((typeof title === 'string') && (typeof text === 'string') && (typeof callback === 'function')) {

			this.setupDialogue('confirmation', icon);

			this.htmlParent(false);
			this.htmlTitle(title);
			this.htmlParagraph(text);
			this.htmlButtonConfirm('button');

			this.callback = callback;
			this.params = params;

			this.showDialogue();
			document.getElementById('box').lastChild.firstChild.focus();
		}

		// *** Message de debug ********************************* //
		else if (apijs.config.debug) {

			this.dialogInformation(apijs.i18n.translate('debugInvalidCall'), '[pre]TheDialogue » dialogConfirmation[br]➩ (string) title : ' + title + '[br]➩ (string) text : ' + text + '[br]➩ (function) callback : ' + callback + '[br]➩ (object) params : ' + params + '[br]➩ (string) icon : ' + icon + '[/pre]');
		}
	};


	// #### Dialogue d'options ##################################### i18n ## debug ## public ### //
	// = révision : 9
	// » Permet à l'utilisateur de modifier des options
	// » Composé d'un formulaire, d'un titre, d'un paragraphe, et de deux boutons de dialogue (Annuler et Valider)
	// » Par la suite peut également être composé d'un lien différé de 5 secondes
	// » Validation du formulaire uniquement si la fonction callback renvoie true
	// » Fermeture par bouton Annuler ou touche Échap tant que le formulaire n'est pas validé
	this.dialogFormOptions = function (title, text, callback, params, action, icon) {

		// *** Création de la boite de dialogue ***************** //
		if ((typeof title === 'string') && (typeof text === 'string') && (typeof callback === 'function') && (typeof action === 'string')) {

			this.setupDialogue('options', icon);

			this.htmlFormParent(action);
			this.htmlTitle(title);
			this.htmlParagraph(text);
			this.htmlButtonConfirm('submit');

			this.callback = callback;
			this.params = params;

			this.showDialogue();
		}

		// *** Message de debug ********************************* //
		else if (apijs.config.debug) {

			this.dialogInformation(apijs.i18n.translate('debugInvalidCall'), '[pre]TheDialogue » dialogFormOptions[br]➩ (string) title : ' + title + '[br]➩ (string) text : ' + text + '[br]➩ (function) callback : ' + callback + '[br]➩ (object) params : ' + params + '[br]➩ (string) action : ' + action + '[br]➩ (string) icon : ' + icon + '[/pre]');
		}
	};


	// #### Dialogue d'upload ###################################### i18n ## debug ## public ### //
	// = révision : 78
	// » Permet à l'utilisateur l'envoi de fichier sans avoir à recharger la page
	// » Composé d'un formulaire, d'un titre, d'un paragraphe, d'un champ fichier, et de deux boutons de dialogue (Annuler et Valider)
	// » Fermeture par bouton Annuler ou touche Échap tant que le formulaire n'est pas validé
	// » Auto-focus sur le champ fichier
	this.dialogFormUpload = function (title, text, data, key, icon) {

		// *** Création de la boite de dialogue ***************** //
		if ((typeof title === 'string') && (typeof text === 'string') && (typeof key === 'string') && (typeof data === 'string')) {

			this.setupDialogue('upload', icon);

			this.htmlFormParent(apijs.config.dialogue.fileUpload, 'multipart/form-data', 'iframeUpload-' + key);
			this.htmlTitle(title);
			this.htmlParagraph(text);
			this.htmlFormUpload(data, key);
			this.htmlButtonConfirm('submit');

			this.showDialogue();
			document.getElementById('box').getElementsByTagName('input')[0].focus();
		}

		// *** Message de debug ********************************* //
		else if (apijs.config.debug) {

			this.dialogInformation(apijs.i18n.translate('debugInvalidCall'), '[pre]TheDialogue » dialogFormUpload[br]➩ (string) title : ' + title + '[br]➩ (string) text : ' + text + '[br]➩ (string) data : ' + data + '[br]➩ (string) key : ' + key + '[br]➩ (string) icon : ' + icon + '[/pre]');
		}
	};


	// #### Dialogue de progression ################################ i18n ## debug ## public ### //
	// = révision : 83
	// » Permet de faire patienter l'utilisateur en affichant une barre de progression
	// » Composé d'un titre, d'un paragraphe, d'une barre de progression, et d'un lien différé de 15 secondes
	// » Fermeture automatique et touche Échap désactivée
	this.dialogProgress = function (title, text, time) {

		// *** Création de la boite de dialogue ***************** //
		if ((typeof title === 'string') && (typeof text === 'string')) {

			this.setupDialogue('progress');

			this.htmlParent(false);
			this.htmlTitle(title);
			this.htmlParagraph(text);
			this.htmlProgressBar();

			this.showDialogue();
			this.timer = window.setTimeout(apijs.dialogue.htmlLinkReload, (typeof time === 'number') ? time : 15000);
		}

		// *** Message de debug ********************************* //
		else if (apijs.config.debug) {

			this.dialogInformation(apijs.i18n.translate('debugInvalidCall'), '[pre]TheDialogue » dialogProgress[br]➩ (string) title : ' + title + '[br]➩ (string) text : ' + text + '[br]➩ (number) time : ' + time + '[/pre]');
		}
	};


	// #### Dialogue d'attente ##################################### i18n ## debug ## public ### //
	// = révision : 72
	// » Permet de faire patienter l'utilisateur en affichant un message d'attente
	// » Composé d'un titre, d'un paragraphe, et d'un lien différé de 5 secondes
	// » Fermeture automatique ou pas et touche Échap désactivée
	this.dialogWaiting = function (title, text, time) {

		// *** Création de la boite de dialogue ***************** //
		if ((typeof title === 'string') && (typeof text === 'string')) {

			this.setupDialogue('waiting');

			this.htmlParent(false);
			this.htmlTitle(title);
			this.htmlParagraph(text);

			this.showDialogue();
			this.timer = window.setTimeout(apijs.dialogue.htmlLinkReload, (typeof time === 'number') ? time : 5000);
		}

		// *** Message de debug ********************************* //
		else if (apijs.config.debug) {

			this.dialogInformation(apijs.i18n.translate('debugInvalidCall'), '[pre]TheDialogue » dialogWaiting[br]➩ (string) title : ' + title + '[br]➩ (string) text : ' + text + '[br]➩ (number) time : ' + time + '[/pre]');
		}
	};


	// #### Dialogue photo ######################################### i18n ## debug ## public ### //
	// = révision : 111
	// » Permet d'afficher une photo en plein écran au premier plan
	// » Composé d'une photo, d'une définition, et de trois boutons de dialogue (Précédent Suivant et Fermer)
	// » Fermeture par bouton Fermer ou touche Échap
	this.dialogPhoto = function (width, height, url, name, date, legend, slideshow) {

		// *** Création de la boite de dialogue ***************** //
		if ((typeof width === 'number') && (typeof height === 'number') && (typeof url === 'string') && (typeof name === 'string') && (typeof date === 'string') && (typeof legend === 'string')) {

			if ((typeof slideshow === 'boolean') && (slideshow === true)) {
				this.setupDialogue('photo slideshow');
				this.htmlParent(true);
			}
			else {
				this.setupDialogue('photo');
				this.htmlParent(false);
			}

			this.htmlPhoto(width, height, url, name, date, legend);
			this.htmlButtonClose();
			this.htmlButtonNavigation();

			this.showDialogue();
			this.loadImage(width, height, url);
		}

		// *** Message de debug ********************************* //
		else if (apijs.config.debug) {

			this.dialogInformation(apijs.i18n.translate('debugInvalidCall'), '[pre]TheDialogue » dialogPhoto[br]➩ (number) width : ' + width + '[br]➩ (number) height : ' + height + '[br]➩ (string) url : ' + url + '[br]➩ (string) name : ' + name + '[br]➩ (string) date : ' + date + '[br]➩ (string) legend : ' + legend + '[/pre]');
		}
	};


	// #### Dialogue vidéo ######################################### i18n ## debug ## public ### //
	// = révision : 70
	// » Permet d'afficher une vidéo en plein écran au premier plan
	// » Composé d'une vidéo, d'une définition, et de trois boutons de dialogue (Précédent Suivant et Fermer)
	// » Fermeture par bouton Fermer ou touche Échap
	this.dialogVideo = function (url, name, date, legend, slideshow) {

		// *** Création de la boite de dialogue ***************** //
		if ((typeof url === 'string') && (typeof name === 'string') && (typeof legend === 'string') && (typeof legend === 'string')) {

			if ((typeof slideshow === 'boolean') && (slideshow === true)) {
				this.setupDialogue('video slideshow');
				this.htmlParent(true);
			}
			else {
				this.setupDialogue('video');
				this.htmlParent(false);
			}

			this.htmlVideo(url, name, date, legend);
			this.htmlButtonClose();
			this.htmlButtonNavigation();

			this.showDialogue();
		}

		// *** Message de debug ********************************* //
		else if (apijs.config.debug) {

			this.dialogInformation(apijs.i18n.translate('debugInvalidCall'), '[pre]TheDialogue » dialogVideo[br]➩ (string) url : ' + url + '[br]➩ (string) name : ' + name + '[br]➩ (string) date : ' + date + '[br]➩ (string) legend : ' + legend + '[/pre]');
		}
	};




	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DÉFINITION DES ACTIONS DES BOUTONS ET DES TOUCHES DU CLAVIER (3)

	// #### Action de fermeture ############################################ event ## public ### //
	// = révision : 41
	// » Supprime la boite de dialogue
	// » Affiche le site internet sur demande
	this.actionClose = function (all) {

		if (all) {
			apijs.dialogue.deleteDialogue(true);
			apijs.dialogue.showPage();
		}
		else {
			apijs.dialogue.deleteDialogue(false);
		}
	};


	// #### Action du bouton Valider ##################### i18n ## debug ## event ## private ### //
	// = révision : 98
	// » Désactive l'action de la touche Échap
	// » Pour le dialogue de confirmation appel la fonction de rappel (appel différé d'au moins 500 millisecondes)
	// » Pour le dialogue d'options envoi le formulaire (envoi différé d'au moins 500 millisecondes)
	// » Pour le dialogue d'upload retour sur [TheUpload]
	this.actionConfirm = function () {

		// *** Dialogue de confirmation ************************* //
		if (this.dialogType.indexOf('confirmation') > -1) {

			this.dialogType += ' lock';

			if (apijs.config.dialogue.savingDialog) {
				this.dialogWaiting(document.getElementById('box').firstChild.firstChild.nodeValue, apijs.i18n.translate('operationInProgress'));
			}
			else {
				this.elemA = document.createElement('p');
				this.elemA.setAttribute('class', 'saving');
				this.elemA.appendChild(document.createTextNode(apijs.i18n.translate('operationInProgress')));

				document.getElementById('box').removeChild(document.getElementById('box').lastChild);
				document.getElementById('box').lastChild.setAttribute('class', 'novisible');
				document.getElementById('box').appendChild(this.elemA);

				this.timer = window.setTimeout(apijs.dialogue.htmlLinkReload, 5000);
			}

			if (apijs.config.dialogue.savingTime > 500) {
				window.setTimeout(function () {
					if (typeof apijs.dialogue.callback === 'function')
						apijs.dialogue.callback(apijs.dialogue.params);
				}, apijs.config.dialogue.savingTime);
			}
			else {
				apijs.dialogue.callback(apijs.dialogue.params);
			}
		}

		// *** Dialogue d'options ******************************* //
		else if (this.dialogType.indexOf('options') > -1) {

			if (apijs.dialogue.callback(apijs.dialogue.params) === true) {

				this.dialogType += ' lock';

				this.elemA = document.createElement('p');
				this.elemA.setAttribute('class', 'saving');
				this.elemA.appendChild(document.createTextNode(apijs.i18n.translate('operationInProgress')));

				document.getElementById('box').removeChild(document.getElementById('box').lastChild);
				document.getElementById('box').lastChild.setAttribute('class', 'novisible');
				document.getElementById('box').appendChild(this.elemA);

				this.timer = window.setTimeout(apijs.dialogue.htmlLinkReload, 5000);

				if (apijs.config.dialogue.savingTime > 500) {
					window.setTimeout(function () {
						if (document.getElementById('box') && (document.getElementById('box').nodeName.toLowerCase() === 'form'))
							document.getElementById('box').submit();
					}, apijs.config.dialogue.savingTime);
					return false;
				}
				else {
					return true;
				}
			}
			else {
				return false;
			}
		}

		// *** Dialogue d'upload ******************************** //
		else if (this.dialogType.indexOf('upload') > -1) {

			this.dialogType += ' lock';

			if ((typeof Upload === 'function') && (apijs.upload instanceof Upload))
				return apijs.upload.actionConfirm();

			else if (apijs.config.debug)
				this.dialogInformation(apijs.i18n.translate('debugInvalidUse'), '[pre]TheDialogue » actionConfirm[br]➩ TheUpload ' + apijs.i18n.translate('debugNotExist') + '[/pre]');
		}
	};


	// #### Action des touches du clavier ################ i18n ## debug ## event ## private ### //
	// = révision : 80
	// » Ferme la boite de dialogue lors de l'appui sur la touche Échap sauf pour les dialogues d'attente, de progression et ceux ayant un verrou
	// » En mode diaporama demande l'affichage du média précédent ou suivant lors de l'appui sur les touches gauche ou droite
	// » En mode diaporama demande l'affichage du premier ou du dernier média lors de l'appui sur les touches début ou fin
	this.actionKey = function (ev) {

		if (apijs.config.debugkey) {
			ev.preventDefault();
			apijs.dialogue.dialogInformation(apijs.i18n.translate('debugKeyDetected'), '[pre]TheDialogue » actionKey[br]' + apijs.i18n.translate('debugKeyCode', ev.keyCode) + '[/pre]');
		}

		else if ((ev.keyCode !== 27) && (ev.keyCode !== 35) && (ev.keyCode !== 36) && (ev.keyCode !== 37) && (ev.keyCode !== 39)) {
			return;
		}

		else if (ev.keyCode === 27) {

			if ((apijs.dialogue.dialogType.indexOf('waiting') > -1) || (apijs.dialogue.dialogType.indexOf('progress') > -1) ||
			    (apijs.dialogue.dialogType.indexOf('lock') > -1)) {
				ev.preventDefault();
			}
			else {
				ev.preventDefault();
				apijs.dialogue.actionClose(true);
			}
		}

		else if (apijs.dialogue.dialogType.indexOf('slideshow') > -1) {

			if (ev.keyCode === 35) {
				ev.preventDefault();
				apijs.slideshow.actionLast();
			}

			else if (ev.keyCode === 36) {
				ev.preventDefault();
				apijs.slideshow.actionFirst();
			}

			else if (ev.keyCode === 37) {
				ev.preventDefault();
				apijs.slideshow.actionPrev();
			}

			else if (ev.keyCode === 39) {
				ev.preventDefault();
				apijs.slideshow.actionNext();
			}
		}
	};




	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// GESTION DE L'AFFICHAGE DES CONTENEURS PARENTS (7)

	// #### Prépare le terrain ##################################################### private ### //
	// = révision : 71
	// » Supprime l'ancien dialogue, cache ou affiche le site lorsque nécessaire
	// » Prend en compte la configuration de [TheSlideshow] si nécessaire
	// » Met en place l'écoute des touches du clavier (eventListener:keydown)
	this.setupDialogue = function (type, icon) {

		// *** Gestion de l'ancien dialogue ********************* //
		var actionHidden = false, actionShow = false, id = null;

		// ancien dialogue
		if (this.dialogType !== null) {

			// ancien dialogue de TheSlideshow
			if (this.dialogType.indexOf('slideshow') > -1) {

				// nouveau dialogue de TheSlideshow
				// cas impossible car il y a eut une demande de fermeture (de TheSlideshow)

				// nouveau dialogue de TheDialogue
					// site affiché / site à cacher
					if (!this.hiddenPage && apijs.config.dialogue.hiddenPage)
						actionHidden = true;

					// site caché / site à afficher
					else if (this.hiddenPage && !apijs.config.dialogue.hiddenPage)
						actionShow = true;
			}
			// ancien dialogue de TheDialogue
			else {
				// site affiché / site à cacher
				if (!this.hiddenPage && apijs.config.dialogue.hiddenPage)
					actionHidden = true;

				// site caché / site à afficher
				else if (this.hiddenPage && !apijs.config.dialogue.hiddenPage)
					actionShow = true;
			}
		}
		// pas d'ancien dialogue
		else {
			// nouveau dialogue de TheSlideshow
			if (type.indexOf('slideshow') > -1) {

				// site affiché / site à cacher
				if (!this.hiddenPage && apijs.config.slideshow.hiddenPage)
					actionHidden = true;
			}
			// nouveau dialogue de TheDialogue
			else {
				// site affiché / site à cacher
				if (!this.hiddenPage && apijs.config.dialogue.hiddenPage)
					actionHidden = true;
			}
		}

		// *** Supprime l'ancien dialogue *********************** //
		if ((this.dialogType !== null) && (this.dialogType.indexOf('slideshow') > -1)) {
			this.deleteDialogue(false);
			document.getElementById('dialogue').setAttribute('class', document.getElementById('dialogue').getAttribute('class').replace(' slideshow', ''));
		}
		else if (this.dialogType !== null) {
			this.deleteDialogue(false);
		}

		// *** Cache ou affiche le site ************************* //
		if (actionHidden) {

			if ((window.pageYOffset > 0) || (this.offset > 0))
				this.offset = window.pageYOffset;

			for (id in apijs.config.dialogue.blocks) if (apijs.config.dialogue.blocks.hasOwnProperty(id))
				document.getElementById(apijs.config.dialogue.blocks[id]).setAttribute('class', 'nodisplay');
		}
		else if (actionShow) {
			this.showPage();
		}

		// *** Active l'écoute des touches ********************** //
		if (apijs.config.navigator)
			document.addEventListener('keydown', apijs.dialogue.actionKey, false);

		// *** Préparation du dialogue ************************** //
		this.dialogType = (typeof icon !== 'string') ? type : (type + ' ' + icon);
		this.hiddenPage = (actionHidden || this.hiddenPage) ? true : false;

		this.fragment = document.createDocumentFragment();
	};


	// #### Affiche le dialogue #################################################### private ### //
	// = révision : 4
	// » Accroche le fragment DOM au document HTML
	// » Permet une animation lors de la mise en place d'un tout nouveau dialogue, donc lorsqu'il n'y en avait pas juste avant
	// » Afin de permettre les transitions CSS la modification de l'attribut class est différée dans le temps (1 milliseconde)
	this.showDialogue = function () {

		// pas de transitions
		if (document.getElementById('dialogue')) {
			this.fragment.firstChild.setAttribute('class', this.fragment.firstChild.getAttribute('class').replace('init', 'actif'));
			document.getElementById('dialogue').appendChild(this.fragment.firstChild.firstChild);
		}

		// transitions non supportées
		else if (!apijs.config.transition) {
			this.fragment.firstChild.setAttribute('class', this.fragment.firstChild.getAttribute('class').replace('init', 'actif'));
			document.getElementsByTagName('body')[0].appendChild(this.fragment);
		}

		// transitions supportées
		else {
			document.getElementsByTagName('body')[0].appendChild(this.fragment);
			window.setTimeout(function () { document.getElementById('dialogue').setAttribute('class', document.getElementById('dialogue').getAttribute('class').replace('init', 'actif')); }, 1);
		}
	};


	// #### Supprime le dialogue ################################################### private ### //
	// = révision : 74
	// » Dégage le timer du lien différé
	// » Annule l'écoute des touches du clavier (eventListener:keydown)
	// » Met en pause la vidéo du dialogue vidéo lorsque nécessaire
	// » Supprime totalement ou pas la boite de dialogue avec ou sans transitions
	// » Afin de permettre les transitions CSS la suppression totale est différée dans le temps (400 millisecondes = temps des transitions)
	// » Réinitialise la plupart des variables
	this.deleteDialogue = function (all) {

		// *** Prépare la suppression du dialogue *************** //
		if (this.timer)
			clearTimeout(this.timer);

		if (apijs.config.navigator)
			document.removeEventListener('keydown', apijs.dialogue.actionKey, false);

		if (apijs.config.navigator && (document.getElementById('dialogue').getElementsByTagName('video').length > 0)) {

			if (typeof document.getElementById('dialogue').getElementsByTagName('video')[0].pause === 'function')
				document.getElementById('dialogue').getElementsByTagName('video')[0].pause();
		}

		// *** Supprime le dialogue ***************************** //
		if (apijs.config.transition && all) {
			document.getElementById('dialogue').setAttribute('class', document.getElementById('dialogue').getAttribute('class').replace('actif', 'deleting lock'));
			window.setTimeout(function () {
				if (document.getElementById('dialogue'))
					document.getElementById('dialogue').parentNode.removeChild(document.getElementById('dialogue'));
			}, 400);
		}
		else if (all) {
			document.getElementById('dialogue').parentNode.removeChild(document.getElementById('dialogue'));
		}
		else {
			document.getElementById('box').parentNode.removeChild(document.getElementById('box'));
		}

		// *** Réinitialise les variables *********************** //
		this.dialogType = null;

		this.image = null;
		this.timer = null;

		this.fragment = null;
		this.elemA = null;
		this.elemB = null;
		this.elemC = null;
		this.elemD = null;
	};


	// #### Affiche le site ######################################################## private ### //
	// = révision : 88
	// » Supprime l'iframe du formulaire d'upload lorsque nécessaire
	// » Affiche le site au bon endroit si celui-ci est caché
	// » Réinitialise les dernières variables
	this.showPage = function () {

		// *** Supprime l'éventuelle iframe ********************* //
		if (document.getElementById('iframeUpload'))
			document.getElementById('iframeUpload').parentNode.removeChild(document.getElementById('iframeUpload'));

		// *** Affiche le site internet ************************* //
		if (this.hiddenPage) {

			for (var id in apijs.config.dialogue.blocks) if (apijs.config.dialogue.blocks.hasOwnProperty(id))
				document.getElementById(apijs.config.dialogue.blocks[id]).removeAttribute('class');

			window.scrollBy(0, this.offset);
		}

		// *** Réinitialise les variables *********************** //
		this.offset = 0;
		this.hiddenPage = false;

		this.callback = null;
		this.params = null;
	};


	// #### Vérifie la taille de la fenêtre ######################################## private ### //
	// = révision : 12
	// » Vérifie si les dialogues photo ou vidéo peuvent être affichés sans redimensionnement
	// » Renvoie true si la photo ou vidéo doit être redimensionnée et false s'il n'y a rien à faire
	this.checkSize = function (width, height) {

		if ((width > (window.innerWidth - 150)) || (height > (window.innerHeight - 100)))
			return true;
		else
			return false;
	};


	// #### Recherche de la taille idéale ########################################## private ### //
	// = révision : 20
	// » Vérifie si la largeur de la boite de dialogue ne dépassera pas la largeur de la fenêtre
	// » Vérifie si la hauteur de la boite de dialogue ne dépassera pas la hauteur de la fenêtre
	// » Adapte la taille du dialogue et de son contenu en conséquence
	// » Logique de calcul de Lytebox 3.2 (http://www.dolem.com/lytebox)
	this.updateSize = function (width, height, url) {

		// *** Préparation des variables ************************ //
		var infoMedia = null, infoWindow = null, mimeTypes = null;

		infoMedia = { width: width, height: height, id: url.slice((url.lastIndexOf('/') + 1), url.lastIndexOf('.')), mime: null };
		infoWindow = { width: window.innerWidth, height: window.innerHeight };
		mimeTypes = {
			ogv: 'video/ogg',  webm: 'video/webm',
			jpg: 'image/jpeg', jpeg: 'image/jpeg',
			tif: 'image/tiff', tiff: 'image/tiff',
			png: 'image/png',   svg: 'image/svg+xml'
		};

		// *** Recherche du type mime *************************** //
		infoMedia.mime = url.slice(url.lastIndexOf('.') + 1);

		if (infoMedia.mime in mimeTypes)
			infoMedia.mime = mimeTypes[infoMedia.mime];

		// *** Calcul des dimensions **************************** //
		if (this.checkSize(width, height)) {

			infoWindow.width -= 150;
			infoWindow.height -= 100;

			// largeur de l'image supérieur à la largeur de la fenêtre
			if (infoMedia.width > infoWindow.width) {

				infoMedia.height = Math.floor(infoMedia.height * (infoWindow.width / infoMedia.width));
				infoMedia.width = infoWindow.width;

				if (infoMedia.height > infoWindow.height) {
					infoMedia.width = Math.floor(infoMedia.width * (infoWindow.height / infoMedia.height));
					infoMedia.height = infoWindow.height;
				}
			}

			// hauteur de l'image supérieur à la hauteur de la fenêtre
			else if (infoMedia.height > infoWindow.height) {

				infoMedia.width = Math.floor(infoMedia.width * (infoWindow.height / infoMedia.height));
				infoMedia.height = infoWindow.height;

				if (infoMedia.width > infoWindow.width) {
					infoMedia.height = Math.floor(infoMedia.height * (infoWindow.width / infoMedia.width));
					infoMedia.width = infoWindow.width;
				}
			}
		}

		// *** Applique les nouvelles dimensions **************** //
		this.fragment.firstChild.firstChild.style.width = infoMedia.width + 'px';
		this.fragment.firstChild.firstChild.style.marginLeft = parseInt(-(infoMedia.width + 20) / 2, 10) + 'px';
		this.fragment.firstChild.firstChild.style.marginTop  = parseInt(-(infoMedia.height + 50) / 2, 10) + 'px';

		return infoMedia;
	};


	// #### Chargement de la photo ################################################# private ### //
	// = révision : 5
	// » Définie l'attribut src de la balise img du dialogue photo
	// » Prends soin d'attendre le temps que la photo soit intégralement chargée avant de l'afficher
	this.loadImage = function (width, height, url) {

		if (apijs.config.navigator && apijs.config.dialogue.showLoader) {

			this.image = new Image(width, height);
			this.image.src = url;

			// eventListener:load
			this.image.addEventListener('load', function () {

				if (document.getElementById('topho')) {
					document.getElementById('topho').removeAttribute('class');
					document.getElementById('topho').setAttribute('src', apijs.dialogue.image.src);
				}
			}, false);

			// eventListener:error
			this.image.addEventListener('error', function () {

				if (document.getElementById('topho')) {

					// suppression des éléments a et span (photo redimensionnée)
					if (document.getElementById('topho').getAttribute('class').indexOf('resized') > -1) {

						var img = document.getElementById('topho').cloneNode(true);
						document.getElementById('topho').parentNode.parentNode.removeChild(document.getElementById('topho').parentNode);
						document.getElementById('box').firstChild.firstChild.appendChild(img);
					}

					// suppression du lien de téléchargement
					if (apijs.config.dialogue.savePhoto)
						document.getElementById('box').firstChild.lastChild.removeChild(document.getElementById('box').firstChild.lastChild.lastChild);

					document.getElementById('topho').setAttribute('class', 'error_' + apijs.config.lang);
				}
			}, false);
		}
		else {
			document.getElementById('topho').removeAttribute('class');
			document.getElementById('topho').setAttribute('src', url);
		}
	};




	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DÉFINITION DU CONTENU DES BOITES DE DIALOGUE (13)

	// #### Éléments parents ####################################################### private ### //
	// = révision : 67
	// » Crée le conteneur parent
	// » Crée le conteneur du contenu du dialogue (div ou form)
	// » Met en place le gestionnaire d'évènement du formulaire (eventListener:submit)
	// # <div class="init [slideshow]" id="dialogue">
	// #  <div class="{this.dialogType}" id="box"></div>
	// # </div>
	this.htmlParent = function (slideshow) {

		// *** Élément div (dialogue) *************************** //
		this.elemA = document.createElement('div');
		this.elemA.setAttribute('class', ((slideshow) ? 'init slideshow' : 'init'));
		this.elemA.setAttribute('id', 'dialogue');

		// *** Élément div (box) ******************************** //
		this.elemB = document.createElement('div');
		this.elemB.setAttribute('class', this.dialogType);
		this.elemB.setAttribute('id', 'box');

		this.elemA.appendChild(this.elemB);

		// sauvegarde des éléments
		this.fragment.appendChild(this.elemA);
	};

	// # <div class="init "id="dialogue">
	// #  <form action="{action}" method="post" [enctype="{enctype}"] [target="{target}"] onsubmit="return apijs.dialogue.actionConfirm();"
	// #   class="{this.dialogType}" id="box"></form>
	// # </div>
	this.htmlFormParent = function (action, enctype, target) {

		// *** Élément div (dialogue) *************************** //
		this.elemA = document.createElement('div');
		this.elemA.setAttribute('class', 'init');
		this.elemA.setAttribute('id', 'dialogue');

		// *** Élément form (box) ******************************* //
		this.elemB = document.createElement('form');
		this.elemB.setAttribute('action', action);
		this.elemB.setAttribute('method', 'post');

		if (typeof enctype === 'string')
			this.elemB.setAttribute('enctype', enctype);

		if (typeof target === 'string')
			this.elemB.setAttribute('target', target);

		this.elemB.setAttribute('onsubmit', 'return apijs.dialogue.actionConfirm();');
		this.elemB.setAttribute('class', this.dialogType);
		this.elemB.setAttribute('id', 'box');

		this.elemA.appendChild(this.elemB);

		// sauvegarde des éléments
		this.fragment.appendChild(this.elemA);
	};


	// #### Titre ################################################################## private ### //
	// = révision : 52
	// » Met en place le titre du dialogue
	// # <h1>{title}</h1>
	this.htmlTitle = function (title) {

		this.elemA = document.createElement('h1');
		this.elemA.appendChild(document.createTextNode(title));

		this.fragment.firstChild.firstChild.appendChild(this.elemA);
	};


	// #### Paragraphe ############################################################# private ### //
	// = révision : 61
	// » Met en place le paragraphe du dialogue
	// » Prend en charge le bbcode grâce à [bbcode]
	// # <div>{data}</div>
	this.htmlParagraph = function (data) {

		var bbcode = new BBcode();
		bbcode.init(data);
		bbcode.exec();

		this.fragment.firstChild.firstChild.appendChild(bbcode.getDomFragment());
	};


	// #### Bouton Ok ###################################################### i18n ## private ### //
	// = révision : 65
	// » Met en place le bouton ok du dialogue d'information
	// » Auto-focus différé sur le bouton ok
	// # <div class="control">
	// #  <button type="button" onclick="apijs.dialogue.actionClose(true);" class="confirm">{i18n.buttonOk}</button>
	// # </div>
	this.htmlButtonOk = function () {

		// Élément div
		this.elemA = document.createElement('div');
		this.elemA.setAttribute('class', 'control');

			// Élément button (Ok)
			this.elemB = document.createElement('button');
			this.elemB.setAttribute('type', 'button');
			this.elemB.setAttribute('onclick', 'apijs.dialogue.actionClose(true);');
			this.elemB.setAttribute('class', 'confirm');
			this.elemB.appendChild(document.createTextNode(apijs.i18n.translate('buttonOk')));

		this.elemA.appendChild(this.elemB);

		// sauvegarde des éléments
		this.fragment.firstChild.firstChild.appendChild(this.elemA);
	};


	// #### Boutons Annuler/Valider ######################################## i18n ## private ### //
	// = révision : 85
	// » Met en place les boutons annuler et valider des dialogues de confirmation, d'options et d'upload
	// » Auto-focus différé sur le bouton valider du dialogue de confirmation ou sur le champ fichier du dialogue d'upload
	// # <div class="control">
	// #  <button type="button" class="cancel" onclick="apijs.dialogue.actionClose(true);">{i18n.buttonCancel}</button>
	// #  <button type="{type}" class="confirm" [onclick="apijs.dialogue.actionConfirm();"]>{i18n.buttonConfirm}</button>
	// # </div>
	this.htmlButtonConfirm = function (type) {

		// Élément div
		this.elemA = document.createElement('div');
		this.elemA.setAttribute('class', 'control');

			// Élément button (Valider)
			this.elemB = document.createElement('button');
			this.elemB.setAttribute('type', type);
			this.elemB.setAttribute('class', 'confirm');

			if (type !== 'submit')
				this.elemB.setAttribute('onclick', 'apijs.dialogue.actionConfirm();');

			this.elemB.appendChild(document.createTextNode(apijs.i18n.translate('buttonConfirm')));

		this.elemA.appendChild(this.elemB);

			// Élément button (Annuler)
			this.elemB = document.createElement('button');
			this.elemB.setAttribute('type', 'button');
			this.elemB.setAttribute('class', 'cancel');
			this.elemB.setAttribute('onclick', 'apijs.dialogue.actionClose(true);');
			this.elemB.appendChild(document.createTextNode(apijs.i18n.translate('buttonCancel')));

		this.elemA.appendChild(this.elemB);

		// sauvegarde des éléments
		this.fragment.firstChild.firstChild.appendChild(this.elemA);
	};


	// #### Boutons Précédent/Suivant ###################################### i18n ## private ### //
	// = révision : 28
	// » Met en place les boutons précédent et suivant des dialogues photo et vidéo
	// » À savoir un bouton à gauche et un bouton à droite de la boite de dialogue
	// » Bouton image ou texte en fonction de la configuration
	// # <div class="navigation [txt|img]">
	// #  <button type="button" disabled="disabled" onclick="apijs.slideshow.actionPrev();" id="prev">
	// #    [<img src="{config.dialogue.imagePrev.src}" width="{config.dialogue.imagePrev.width}" height="{config.dialogue.imagePrev.height}"
	// #     alt="{i18n.buttonPrev}" />][{i18n.buttonPrev}]
	// #  </button>
	// #  <button type="button" disabled="disabled" onclick="apijs.slideshow.actionNext();" id="next">
	// #    [<img src="{config.dialogue.imageNext.src}" width="{config.dialogue.imageNext.width}" height="{config.dialogue.imageNext.height}"
	// #     alt="{i18n.buttonNext}" />][{i18n.buttonNext}]
	// #  </button>
	// # </div>
	this.htmlButtonNavigation = function () {

		var txt = ((apijs.config.dialogue.imagePrev === null) || (apijs.config.dialogue.imageNext === null)) ? true : false;

		// Élément div
		this.elemA = document.createElement('div');
		this.elemA.setAttribute('class', 'navigation ' + ((txt) ? 'txt' : 'img'));

			// *** Élément button (Précédent) ****************** //
			this.elemB = document.createElement('button');
			this.elemB.setAttribute('type', 'button');
			this.elemB.setAttribute('disabled', 'disabled');
			this.elemB.setAttribute('onclick', 'apijs.slideshow.actionPrev();');
			this.elemB.setAttribute('id', 'prev');

			if (txt) {
				this.elemB.appendChild(document.createTextNode(apijs.i18n.translate('buttonPrev')));
			}
			else {
				// Élément img
				this.elemC = document.createElement('img');
				this.elemC.setAttribute('src', apijs.config.dialogue.imagePrev.src);
				this.elemC.setAttribute('width', apijs.config.dialogue.imagePrev.width);
				this.elemC.setAttribute('height', apijs.config.dialogue.imagePrev.height);
				this.elemC.setAttribute('alt', apijs.i18n.translate('buttonPrev'));

				this.elemB.appendChild(this.elemC);
			}

		this.elemA.appendChild(this.elemB);

			// *** Élément button (Suivant) ******************** //
			this.elemB = document.createElement('button');
			this.elemB.setAttribute('type', 'button');
			this.elemB.setAttribute('disabled', 'disabled');
			this.elemB.setAttribute('onclick', 'apijs.slideshow.actionNext();');
			this.elemB.setAttribute('id', 'next');

			if (txt) {
				this.elemB.appendChild(document.createTextNode(apijs.i18n.translate('buttonNext')));
			}
			else {
				// Élément img
				this.elemC = document.createElement('img');
				this.elemC.setAttribute('src', apijs.config.dialogue.imageNext.src);
				this.elemC.setAttribute('width', apijs.config.dialogue.imageNext.width);
				this.elemC.setAttribute('height', apijs.config.dialogue.imageNext.height);
				this.elemC.setAttribute('alt', apijs.i18n.translate('buttonNext'));

				this.elemB.appendChild(this.elemC);
			}

		this.elemA.appendChild(this.elemB);

		// sauvegarde des éléments
		this.fragment.firstChild.firstChild.appendChild(this.elemA);
	};


	// #### Bouton Fermer ################################################## i18n ## private ### //
	// = révision : 87
	// » Met en place le bouton fermer des dialogues photo et vidéo
	// » À savoir un bouton image dans le coin en haut à droite de la boite de dialogue
	// # <div class="close">
	// #  <button type="button" onclick="apijs.dialogue.actionClose(true);" class="close">
	// #    [<img src="{config.dialogue.imageClose.src}" width="{config.dialogue.imageClose.width}" height="{config.dialogue.imageClose.height}"
	// #     alt="{i18n.buttonClose}" />][{i18n.buttonClose}]
	// #  </button>
	// # </div>
	this.htmlButtonClose = function () {

		// Élément div
		this.elemA = document.createElement('div');
		this.elemA.setAttribute('class', 'close');

			// Élément button (Fermer)
			this.elemB = document.createElement('button');
			this.elemB.setAttribute('type', 'button');
			this.elemB.setAttribute('onclick', 'apijs.dialogue.actionClose(true);');
			this.elemB.setAttribute('class', 'close');

			if (apijs.config.dialogue.imageClose !== null) {

				// Élément img
				this.elemC = document.createElement('img');
				this.elemC.setAttribute('src', apijs.config.dialogue.imageClose.src);
				this.elemC.setAttribute('width', apijs.config.dialogue.imageClose.width);
				this.elemC.setAttribute('height', apijs.config.dialogue.imageClose.height);
				this.elemC.setAttribute('alt', apijs.i18n.translate('buttonClose'));

				this.elemB.appendChild(this.elemC);
			}
			else {
				this.elemB.appendChild(document.createTextNode(apijs.i18n.translate('buttonClose')));
			}

		this.elemA.appendChild(this.elemB);

		// sauvegarde des éléments
		this.fragment.firstChild.firstChild.appendChild(this.elemA);
	};


	// #### Lien différé ######################################## i18n ## timeout ## private ### //
	// = révision : 70
	// » Met en place le lien différé des dialogues de confirmation, d'options, d'attente et de progression
	// » Appel différé dans le temps comme son nom le suggère
	// # <p class="reload">{i18n.operationTooLong} <a href="{location.href}">{i18n.reloadLink}</a>.
	// # <br />{i18n.warningLostChange}</p>
	this.htmlLinkReload = function () {

		// Élément p
		this.elemA = document.createElement('p');
		this.elemA.setAttribute('class', 'reload');
		this.elemA.appendChild(document.createTextNode(apijs.i18n.translate('operationTooLong')));

			// Élément a (lien recharger)
			this.elemB = document.createElement('a');
			this.elemB.setAttribute('href', location.href);
			this.elemB.appendChild(document.createTextNode(apijs.i18n.translate('reloadLink')));

		this.elemA.appendChild(this.elemB);
		this.elemA.appendChild(document.createTextNode('.'));

			// Élément br
			this.elemB = document.createElement('br');

		this.elemA.appendChild(this.elemB);
		this.elemA.appendChild(document.createTextNode(apijs.i18n.translate('warningLostChange')));

		// mise à jour du document
		document.getElementById('box').appendChild(this.elemA);
	};


	// #### Formulaire d'envoi de fichier ########################################## private ### //
	// = révision : 132
	// » Met en place le contenu du formulaire du dialogue d'upload
	// » Composé d'un champ fichier et d'un champ caché pour l'extension APC de PHP
	// » Composé également d'une iframe qui sera détruite lors de l'affichage du site
	// » En profite par la même occasion pour pré-charger le graphique SVG du dialogue de progression
	// » Basculement automatique du focus entre le champ fichier et le bouton valider du formulaire
	// » À noter qu'il est obligatoire d'utiliser un nom d'iframe unique
	// # <iframe [src="{config.dialogue.imageUpload.src}"] name="iframeUpload-{key}" id="iframeUpload" />
	// # <div>
	// #  <input type="file" name="{data}" onchange="document.getElementById('box').lastChild.firstChild.focus();" />
	// #  <input type="hidden" name="APC_UPLOAD_PROGRESS" value="{key}" />
	// # </div>
	this.htmlFormUpload = function (data, key) {

		// *** Élément iframe *********************************** //
		this.elemA = document.createElement('iframe');

		if (apijs.config.navigator)
			this.elemA.setAttribute('src', apijs.config.dialogue.imageUpload.src);

		this.elemA.setAttribute('name', 'iframeUpload-' + key);
		this.elemA.setAttribute('id', 'iframeUpload');

		document.getElementsByTagName('body')[0].appendChild(this.elemA);

		// *** Élément div ************************************** //
		this.elemA = document.createElement('div');

			// Élément input (fichier)
			this.elemB = document.createElement('input');
			this.elemB.setAttribute('type', 'file');
			this.elemB.setAttribute('name', data);
			this.elemB.setAttribute('onchange', "document.getElementById('box').lastChild.firstChild.focus();");

		this.elemA.appendChild(this.elemB);

			// Élément input (clef)
			this.elemB = document.createElement('input');
			this.elemB.setAttribute('type', 'hidden');
			this.elemB.setAttribute('name', 'APC_UPLOAD_PROGRESS');
			this.elemB.setAttribute('value', key);

		this.elemA.appendChild(this.elemB);

		// sauvegarde des éléments
		this.fragment.firstChild.firstChild.appendChild(this.elemA);
	};


	// #### Barre de progression ################################################### private ### //
	// = révision : 45
	// » Met en place le graphique SVG du dialogue de progression
	// » Rien ne s'affiche lorsque le format SVG n'est pas géré par le navigateur
	// » Même chose si le fichier est introuvable
	// # <object data="{config.dialogue.imageUpload.src}" type="image/svg+xml" width="{config.dialogue.imageUpload.width}"
	// #  height="{config.dialogue.imageUpload.height}" id="progressbar" />
	this.htmlProgressBar = function () {

		// Élément object (graphique SVG)
		this.elemA = document.createElement('object');
		this.elemA.setAttribute('data', apijs.config.dialogue.imageUpload.src);
		this.elemA.setAttribute('type', 'image/svg+xml');
		this.elemA.setAttribute('width', apijs.config.dialogue.imageUpload.width);
		this.elemA.setAttribute('height', apijs.config.dialogue.imageUpload.height);
		this.elemA.setAttribute('id', 'progressbar');

		// sauvegarde de l'élément
		this.fragment.firstChild.firstChild.appendChild(this.elemA);
	};


	// #### Photo et légende ############################################### i18n ## private ### //
	// = révision : 136
	// » Met en place la photo et la légende du dialogue photo
	// » Redimensionne la photo en fonction de la taille de la fenêtre lorsque nécessaire
	// » Affiche une icône zoom au survol de la photo si la photo est redimensionnée lors de son affichage
	// » Affiche un lien pour télécharger la photo si la configuration le permet
	// # <dl>
	// #  <dt>
	// #    [<a href="{url}" onclick="window.open(this.href); this.blur(); return false;">]
	// #      <img width="{infoPhoto.width}" height="{infoPhoto.height}" class="loading [resized]" id="topho" />
	// #      [<span />]
	// #    [</a>]
	// #  </dt>
	// #  <dd>
	// #    [<span>{infoPhoto.id/name} ({date})</span>] {legend}
	// #    [<a href="{config.dialogue.filePhoto}?id={infoPhoto.id}" type="{infoPhoto.mime}" class="download">{i18n.downloadLink}</a>]
	// #  </dd>
	// # </dl>
	this.htmlPhoto = function (width, height, url, name, date, legend) {

		// vérification des dimensions
		var infoPhoto = this.updateSize(width, height, url);

		// Élément dl
		this.elemA = document.createElement('dl');

			// *** Élément dt (terme) ************************** //
			this.elemB = document.createElement('dt');

				// Éléments a img span (photo redimensionnée)
				// # <a href="{url}" onclick="window.open(this.href); this.blur(); return false;">
				// #  <img width="{infoPhoto.width}" height="{infoPhoto.height}" class="loading resized" id="topho" />
				// #  <span />
				// # </a>
				if (this.checkSize(width, height)) {

					this.elemC = document.createElement('a');
					this.elemC.setAttribute('href', url);
					this.elemC.setAttribute('onclick', 'window.open(this.href); this.blur(); return false;');

						this.elemD = document.createElement('img');
						this.elemD.setAttribute('width', infoPhoto.width);
						this.elemD.setAttribute('height', infoPhoto.height);
						this.elemD.setAttribute('class', 'loading resized');
						this.elemD.setAttribute('id', 'topho');

					this.elemC.appendChild(this.elemD);
					this.elemC.appendChild(document.createElement('span'));
				}
				// Élément img
				// # <img width="{infoPhoto.width}" height="{infoPhoto.height}" class="loading" id="topho" />
				else {
					this.elemC = document.createElement('img');
					this.elemC.setAttribute('width', infoPhoto.width);
					this.elemC.setAttribute('height', infoPhoto.height);
					this.elemC.setAttribute('class', 'loading');
					this.elemC.setAttribute('id', 'topho');
				}

			this.elemB.appendChild(this.elemC);

		this.elemA.appendChild(this.elemB);

			// *** Élément dd (définition) ********************* //
			this.elemB = document.createElement('dd');

				// Élément span
				// # <span>{infoPhoto.id/name} ({date})</span>
				if ((name !== 'false') || (date !== 'false')) {

					this.elemC = document.createElement('span');

					// name + date
					if ((name !== 'false') && (name !== 'auto') && (date !== 'false'))
						this.elemC.appendChild(document.createTextNode(name + ' (' + date + ')'));

					// name
					else if ((name !== 'false') && (name !== 'auto'))
						this.elemC.appendChild(document.createTextNode(name));

					// auto name + date
					else if ((name === 'auto') && (date !== 'false'))
						this.elemC.appendChild(document.createTextNode(infoPhoto.id + ' (' + date + ')'));

					// auto name
					else if (name === 'auto')
						this.elemC.appendChild(document.createTextNode(infoPhoto.id));

					// date
					else if (date !== 'false')
						this.elemC.appendChild(document.createTextNode('(' + date + ')'));

					this.elemB.appendChild(this.elemC);
				}

				// Nœud texte
				// # {legend}
				this.elemB.appendChild(document.createTextNode(' ' + legend + ' '));

				// Élément a (lien télécharger)
				// # <a href="{config.dialogue.filePhoto}?id={infoPhoto.id}" type="{infoPhoto.mime}" class="download">{i18n.downloadLink}</a>
				if (apijs.config.dialogue.savePhoto) {

					this.elemC = document.createElement('a');
					this.elemC.setAttribute('href', apijs.config.dialogue.filePhoto + '?id=' + infoPhoto.id);
					this.elemC.setAttribute('type', infoPhoto.mime);
					this.elemC.setAttribute('class', 'download');
					this.elemC.appendChild(document.createTextNode(apijs.i18n.translate('downloadLink')));

					this.elemB.appendChild(this.elemC);
				}

		this.elemA.appendChild(this.elemB);

		// sauvegarde des éléments
		this.fragment.firstChild.firstChild.appendChild(this.elemA);
	};


	// #### Vidéo et légende ############################################### i18n ## private ### //
	// = révision : 74
	// » Met en place la vidéo et la légende du dialogue vidéo
	// » Redimensionne la vidéo en fonction de la taille de la fenêtre lorsque nécessaire
	// » Un message d'information s'affiche lorsque la balise vidéo n'est pas gérée par le navigateur
	// » Affiche un lien pour télécharger la vidéo si la configuration le permet
	// # <dl>
	// #  <dt>
	// #    <video src="{url}" width="{infoVideo.width}" height="{infoVideo.height}" controls="controls" [autoplay="autoplay"]>
	// #    {i18n.browserNoVideo}<br />{i18n.browserUpgrade}
	// #    </video>
	// #  </dt>
	// #  <dd>
	// #    [<span>{infoVideo.id/name} ({date})</span>] {legend}
	// #    [<a href="{config.dialogue.fileVideo}?id={infoVideo.id}" type="{infoVideo.mime}" class="download">{i18n.downloadLink}</a>]
	// #  </dd>
	// # </dl>
	this.htmlVideo = function (url, name, date, legend) {

		// vérification des dimensions
		var novideo = null, infoVideo = this.updateSize(apijs.config.dialogue.videoWidth, apijs.config.dialogue.videoHeight, url);

		// Élément dl
		this.elemA = document.createElement('dl');

			// *** Élément dt (terme) ************************** //
			this.elemB = document.createElement('dt');

				// Élément video
				this.elemC = document.createElement('video');
				this.elemC.setAttribute('src', url);
				this.elemC.setAttribute('width', infoVideo.width);
				this.elemC.setAttribute('height', infoVideo.height);
				this.elemC.setAttribute('controls', 'controls');

				if (apijs.config.dialogue.autoPlay)
					this.elemC.setAttribute('autoplay', 'autoplay');

				// pour les navigateurs obsolètes
				if (!apijs.config.navigator || (typeof this.elemC.pause !== 'function')) {

					novideo = new BBcode();
					novideo.init(apijs.i18n.translate('browserNoVideo'));
					novideo.exec();

					this.elemC.appendChild(novideo.getDomFragment());
					this.elemC.style.width = infoVideo.width;
					this.elemC.style.height = infoVideo.height;
				}

			this.elemB.appendChild(this.elemC);

		this.elemA.appendChild(this.elemB);

			// *** Élément dd (définition) ********************* //
			this.elemB = document.createElement('dd');

				// Élément span
				// # <span>{infoVideo.id/name} ({date})</span>
				if ((name !== 'false') || (date !== 'false')) {

					this.elemC = document.createElement('span');

					// name + date
					if ((name !== 'false') && (name !== 'auto') && (date !== 'false'))
						this.elemC.appendChild(document.createTextNode(name + ' (' + date + ')'));

					// name
					else if ((name !== 'false') && (name !== 'auto'))
						this.elemC.appendChild(document.createTextNode(name));

					// auto name + date
					else if ((name === 'auto') && (date !== 'false'))
						this.elemC.appendChild(document.createTextNode(infoVideo.id + ' (' + date + ')'));

					// auto name
					else if (name === 'auto')
						this.elemC.appendChild(document.createTextNode(infoVideo.id));

					// date
					else if (date !== 'false')
						this.elemC.appendChild(document.createTextNode('(' + date + ')'));

					this.elemB.appendChild(this.elemC);
				}

				// Nœud texte
				// # {legend}
				this.elemB.appendChild(document.createTextNode(' ' + legend + ' '));

				// Élément a (lien télécharger)
				// # <a href="{config.dialogue.fileVideo}?id={infoVideo.id}" type="{infoVideo.mime}" class="download">{i18n.downloadLink}</a>
				if (apijs.config.dialogue.saveVideo) {

					this.elemC = document.createElement('a');
					this.elemC.setAttribute('href', apijs.config.dialogue.fileVideo + '?id=' + infoVideo.id);
					this.elemC.setAttribute('type', infoVideo.mime);
					this.elemC.setAttribute('class', 'download');
					this.elemC.appendChild(document.createTextNode(apijs.i18n.translate('downloadLink')));

					this.elemB.appendChild(this.elemC);
				}

		this.elemA.appendChild(this.elemB);

		// sauvegarde des éléments
		this.fragment.firstChild.firstChild.appendChild(this.elemA);
	};
}