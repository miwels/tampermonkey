// ==UserScript==
// @name        Guidel Phpmyadmin
// @author	Miguel Martin
// @namespace   http://add.your.namespace.here
// @description Customize Guidel phpadmin to be more handy and do some routine
// @match       http://db.goes.here
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @version     1.0.30
// @grant       none
// @icon		http://icons.iconarchive.com/icons/franksouza183/fs/64/Places-folder-php-icon.png
// ==/UserScript==
//

requiredJquery = jQuery.noConflict(true);
(function($) {
	$(document).ready(function() {

		frameNavigation = getFrame('frame_navigation');
		frameContent = getFrame('frame_content');
		isLoggedIn = !frameNavigation.find('body.loginform').length && !frameContent.find('body.loginform').length;
  
		var events = {
			list: {},
			add: function(name, callback)
			{
				if (typeof events.list[name] === 'undefined')
					events.list[name] = callback
				else
					events.list[name].push(callback);
			},
			trigger: function(name)
			{
				if (typeof events.list[name] === 'undefined')
					console.error('Event ' + name + ' doesn\'t exists')
				else
					events.list[name]();
			}
		};

		var storage = {
			set: function(key, value) {
				localStorage.setItem('gpma_' + key, value);
			},
			remove: function(key) {
				localStorage.removeItem('gpma_' + key);
			},
			get: function(key)
			{
				return localStorage.getItem('gpma_' + key);
			}
		}

		events.add('onDbNotSelected', function() {
			if (frameNavigation.find('#databaseList').length)
			{
				link = frameNavigation.find('#databaseList .group li:contains(_drupal) a');
				//window.frames['frame_navigation'].document.getElementById('databaseList').click();
				console.log(link);
				link.get(0).click();
			}
		});

		events.add('onPageLoaded', function() {
			fastFilter = frameNavigation.find('#fast_filter')
			//nothingSelected = !frameNavigation.find('#subl0 .marked').length;
			if (fastFilter.length && fastFilter.val() == 'filter tables by name')
			{
				fastFilter.focus();
			}

			if (frameContent.find('#topmenu .tabactive:contains(Export)').length)
			{
				events.trigger('onExportPageLoaded');
			}
		});

		events.add('onExportPageLoaded', function() {
			selectTables = frameContent.find('#table_select');
			selectTables.height(400);
			div = $('<div style="display: inline-block; padding-left: 20px;"/>');

			addExportAction = function(link) {
				div.append('<br>');
				div.append(link);
			}

			selectExportTables = function(tables) {
				selectTables.find('option:not(:selected)').each(function() {
					if (tables.indexOf($(this).val()) > -1)
					{
						$(this).prop('selected', true);
					}
				});
			};
			unselectExportTables = function(tables) {
				selectTables.find('option:selected').each(function() {
					if (tables.indexOf($(this).val()) > -1)
					{
						$(this).prop('selected', false);
					}
				});
			};

			drupalUsers = $('<a/>').html('<strong>Drupal:</strong> Users').click(function() {
				tables = [
					'og_uid',
					'og_uid_global',
					'profile_fields',
					'profile_values',
					'role',
					'usermode',
					'users',
					'users_roles',
					'user_timezone',
				];

				selectExportTables(tables);

				return false;
			});

			drupalWritingInterface = $('<a/>').text('Drupal: Writing interface').click(function() {
				tables = [
					'gel_writing_interface_answer_bucket',
					'gel_writing_interface_answer_cloze',
					'gel_writing_interface_answer_cloze_tag',
					'gel_writing_interface_answer_crossword',
					'gel_writing_interface_answer_diagram',
					'gel_writing_interface_answer_dropdown',
					'gel_writing_interface_answer_match',
					'gel_writing_interface_answer_mc',
					'gel_writing_interface_answer_mix',
					'gel_writing_interface_answer_quiz',
					'gel_writing_interface_answer_sa',
					'gel_writing_interface_answer_teacher',
					'gel_writing_interface_audio_character',
					'gel_writing_interface_audio_config',
					'gel_writing_interface_audio_script',
					'gel_writing_interface_brief',
					'gel_writing_interface_brief_note',
					'gel_writing_interface_changelog',
					'gel_writing_interface_exercise',
					'gel_writing_interface_exercise_note',
					'gel_writing_interface_exercise_teacher',
					'gel_writing_interface_exercise_type',
					'gel_writing_interface_exercise_type_group',
					'gel_writing_interface_prev_audio',
					'gel_writing_interface_project',
					'gel_writing_interface_question_bucket',
					'gel_writing_interface_question_cloze',
					'gel_writing_interface_question_crossword',
					'gel_writing_interface_question_diagram',
					'gel_writing_interface_question_dropdown',
					'gel_writing_interface_question_file',
					'gel_writing_interface_question_match',
					'gel_writing_interface_question_mc',
					'gel_writing_interface_question_mix',
					'gel_writing_interface_question_note',
					'gel_writing_interface_question_quiz',
					'gel_writing_interface_question_sa',
					'gel_writing_interface_question_teacher',
					'gel_writing_interface_tag',
					'gel_writing_interface_tag_bup',
					'gel_writing_interface_tag_category',
					'gel_writing_interface_type_content',
					'gel_writing_interface_vocabulary',
					'gel_writing_interface_vocabulary_speech',
					'gel_writing_interface_wordlist_cloze',
				];

				selectExportTables(tables);

				return false;
			});

			drupalWritingInterfaceTeachesOnly = $('<a/>').text('Drupal: Writing interface (_teacher only)').click(function() {
				tables = [
					'gel_writing_interface_answer_teacher',
					'gel_writing_interface_exercise_teacher',
					'gel_writing_interface_question_teacher',
				];

				selectExportTables(tables);

				return false;
			});

			drupalPlaylists = $('<a/>').text('Drupal: Playlists').click(function() {
				tables = [
					'gel_playlist',
					'gel_playlist_cando',
					'gel_playlist_cando_ec',
					'gel_playlist_cando_lse',
					'gel_playlist_cando_lse_uid',
					'gel_playlist_exercise',
				];

				selectExportTables(tables);

				return false;
			});

			drupalProgressTest = $('<a/>').text('Drupal: Progress test').click(function() {
				tables = [
					'gel_progress_test',
					'gel_progress_test_assign',
					'gel_progress_test_manual_level',
					'gel_progress_test_manual_name',
					'gel_progress_test_options',
					'gel_progress_test_writing',
					'gel_progress_testfeedback',
					'gel_progress_testfeedback_fr',
					'gel_progress_testlevels',
					'gel_progress_testmodule',
					'gel_progress_testquestions',
					'gel_progress_testresults',
				];

				selectExportTables(tables);

				return false;
			});

			drupalCustomers = $('<a/>').text('Drupal: Gel customers').click(function() {
				tables = [
					'gel_customers',
					'gel_customers_blocks',
					'gel_customers_branding',
					'gel_customers_costs',
					'gel_customers_uid_branding',
				];

				selectExportTables(tables);

				return false;
			});

			moodleUsers = $('<a/>').html('<strong>Moodle</strong>: Users').click(function() {
				tables = [
					'mdl_user',
					'mdl_user_info_category',
					'mdl_user_info_data',
					'mdl_user_info_field',
					'mdl_user_preferences',
				];

				selectExportTables(tables);

				return false;
			});

			isDrupalDb = frameContent.find('form[name=dump] input[name=db]').val() == 'guidel_drupal';
			if (isDrupalDb)
			{
				addExportAction(drupalUsers);
				addExportAction(drupalWritingInterface);
				addExportAction(drupalWritingInterfaceTeachesOnly);
				addExportAction(drupalPlaylists);
				addExportAction(drupalProgressTest);
				addExportAction(drupalCustomers);
			}
			else
			{
				addExportAction(moodleUsers);
			}

			exportActionsPanel = $('<div/>').css('margin-top', '20px');
			exportButton = $('<button>')
				.text('Export gzip, data and structure, disable foreign keys, drop tables if exists')
				.css('margin-top', '20px')
				.click(function(){
					frameContent.find('#compression option[value=gzip]').attr('selected', true);
					frameContent.find('#checkbox_sql_disable_fk').attr('checked', true);
					frameContent.find('#checkbox_sql_drop_table').attr('checked', true);
					frameContent.find('#buttonGo').click();
					if (!$(this).next().length)
					{
						$(this).after("<p class='temp'/>");
					}

					$(this).next().html(
						"Downloading <strong>" + frameContent.find('#filename_template').val() + ".sql.gz</strong>"
					);
				})
				.appendTo(exportActionsPanel);
			
			div.append(exportActionsPanel);

			selectTables.after(div);

			/**
			 * Unselect backup tables
			 */
			unselectBackupTablesLink = $('<a/>')
				.text("Unselect backups")
				.click(function() {
					selectTables.find('option:selected').each(function() {
						if (isBackupTable($(this).val()))
						{
							$(this).prop('selected', false);
						}
					});
				})
			frameContent.find('#databases_and_tables a:eq(1)')
				.after(unselectBackupTablesLink)
				.after(" / ")
		});

		function getFrame(name)
		{
			frame = typeof window.frames[name] === 'undefined'
				? window.document
				: window.frames[name].document;

			return $(frame);
		}

		function isBackupTable(name)
		{
			return name.match(/(_bup$)|(_bkp$)|([\-_]bkp[\-_])|([\-_]bup[\-_])|([\-_]bad$)|([\-_]old$)|([\-_]backup$)|(\d$)/g);
		}

		if (!frameNavigation.find('#lightm_db').length)
		{
			events.trigger('onDbNotSelected');
		}

		events.trigger('onPageLoaded');


	});
})(requiredJquery);

