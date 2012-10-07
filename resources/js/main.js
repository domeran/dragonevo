
function is_string(element) {
    return (typeof element == 'string');
}

function ucfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var Devo = {
    Core: {
		Pollers: {
			Locks: {},
			Callbacks: {}
		},
		Events: {},
		Listeners: {}
	},
    Main: {
        Helpers: {
            Backdrop: {},
            Dialog: {},
            Message: {}
        },
		Login: {},
		Profile: {}
    },
	Chat: {
		Bubbles: []
	},
	Admin: {
		Cards: {},
		Users: {}
	},
	Play: {},
	Game: {
		Effects: {},
		Events: []
	},
	effect_queues: {
		successmessage: 'Devo_successmessage',
		failedmessage: 'Devo_failedmessage'
	},
	debug: false
}

Devo.Chat.emoticons = {
	'Angel': ['"(^_^)"', 'O:)', 'O:-)', ],
	'Ambivalent': ['(-_-)', '(◒_◒)', '-_-', ':-|', ':|'],
	'Grin': ['^^', '(^^)', '(^-^)', '^-^'],
	'Crazy': ['(⊙◡⊙)', '%-)', '%-)', '%)'],
	'Nerd': ['B-)', 'B-|', 'B)', 'B|'],
	'Naughty': ['(･ω･)', ':-3', '&gt;:-)', '&gt;:)', '&gt;:-&gt;'],
	'Yum': [':-d', ':d'],
	'ThumbsUp': ['(^_^)d', '(Y)', '(y)'],
	'ThumbsDown': ['(-_-)p', '(N)', '(n)'],
	'Blush': ['(^_^*)', '^_^*', '(n///n)', ':{'],
	'Confused': ['(@_@)', '@_@', ':-S', ':S', '(.O.)'],
	'Gasp': ['0_o', '(0_o)', '=-o', ':-O'],
	'Heart': ['(♥_♥)', '&lt;3'],
	'Hot': ['(^_^)V', '^_^V', '8)', '8-)'],
	'Smile': ['(^_^)', '^_^', ':)', 'c",)', ':-)', ':))', '=)'],
	'Laugh': ['(^o^)', '^o^', '(^O^)', '^O^', '(^0^)', '^0^', ':D', ':-D', 'XD'],
	'Tongue': [':-P', ':P', ':p', ':-p'],
	'Innoncent': ['⚫_⚫', '(⚫_⚫)', '*_*', '(*_*)'],
	'Angry': ['(ò_ó)', '&gt;:o', ':-E'],
	'Crying': ['(T_T)', 'T_T', ':\\\'-(', ':\\\'(', ':\\\'('],
	'Wink': ['(~_^)', '~_^', ';-)', ';)', '*)'],
	'Kiss': ['(^3^)', ':-*', ':*'],
	'LargeGasp': ['(O_O)', '0_0', ':-O', '(°⋄°)', '=O'],
	'Money-mouth': ['($_$)', '$-)', ':$', ':-$'],
	'ohnoes': ['(&gt;_&lt;)', 'D:', '&gt;_&lt;'],
	'Pirate': ['P-)'],
	'Sarcastic': ['(õ_ó)', 'õ_ó', 'o_-', '(o_-)', ';/', '(¬_¬)', '¬_¬', '(>_>)', '>_>', ':/', ':\\'],
	'Sealed': ['(-.-)', ':-X', ':X', ':x'],
	'Sick': ['(+_+)', '+_+', '(X_X)', '(x_x)', 'X_X', 'x_x', ':[['],
	'Frown': ['(._.)', ':-(', ':('],
	'Sweat': ['(^^\')', '^^"', '^^\'', ':!', ':-!'],
	'Undecided': ['(=_=)', '=_=', ':|'],
	'VeryAngry': [':-@', ':@']
}

Devo.Core._processCommonAjaxPostEvents = function(options) {
	if (options.remove) {
		if (is_string(options.remove)) {
			if ($(options.remove)) $(options.remove).remove();
		}else {
			options.remove.each(function(s) {if (is_string(s) && $(s)) $(s).remove();else if ($(s)) s.remove();});
		}
	}
	if (options.hide) {
		if (is_string(options.hide)) {
			if ($(options.hide)) $(options.hide).hide();
		}else {
			options.hide.each(function(s) {if (is_string(s) && $(s)) $(s).hide();else if ($(s)) s.hide();});
		}
	}
	if (options.show) {
		if (is_string(options.show)) {
			if ($(options.show)) $(options.show).show();
		}else {
			options.show.each(function(s) {if ($(s)) $(s).show();});
		}
	}
	if (options.enable) {
		if (is_string(options.enable)) {
			if ($(options.enable)) $(options.enable).enable();
		} else {
			options.enable.each(function(s) {if ($(s)) $(s).enable();});
		}
	}
	if (options.disable) {
		if (is_string(options.disable)) {
			if ($(options.disable)) $(options.disable).disable();
		} else {
			options.disable.each(function(s) {if ($(s)) $(s).disable();});
		}
	}
	if (options.reset) {
		if (is_string(options.reset)) {
			if ($(options.reset)) $(options.reset).reset();
		} else {
			options.reset.each(function(s) {if ($(s)) $(s).reset();});
		}
	}
	if (options.clear) {
		if (is_string(options.clear)) {
			if ($(options.clear)) $(options.clear).clear();
		} else {
			options.clear.each(function(s) {if ($(s)) $(s).clear();});
		}
	}
};

Devo.Core.Events.trigger = function(key, options) {
	if (Devo.Core.Listeners[key]) {
		Devo.Core.Listeners[key].each(function(callback) {
			callback(options);
		});
	}
};

Devo.Core.Events.listen = function(key, callback) {
	if (!Devo.Core.Listeners[key]) {
		Devo.Core.Listeners[key] = [];
	}
	Devo.Core.Listeners[key].push(callback);
};

Devo.Main.Helpers.Message.clear = function() {
	Effect.Queues.get(Devo.effect_queues.successmessage).each(function(effect) {effect.cancel();});
	Effect.Queues.get(Devo.effect_queues.failedmessage).each(function(effect) {effect.cancel();});
	if ($('dragonevo_successmessage').visible()) {
		$('dragonevo_successmessage').fade({duration: 0.2});
	}
	if ($('dragonevo_failuremessage').visible()) {
		$('dragonevo_failuremessage').fade({duration: 0.2});
	}
};

Devo.Main.Helpers.Message.error = function(title, content) {
	$('dragonevo_failuremessage_title').update(title);
	$('dragonevo_failuremessage_content').update(content);
	if ($('dragonevo_successmessage').visible()) {
		Effect.Queues.get(Devo.effect_queues.successmessage).each(function(effect) {effect.cancel();});
		new Effect.Fade('dragonevo_successmessage', {queue: {position: 'end', scope: Devo.effect_queues.successmessage, limit: 2}, duration: 0.2});
	}
	if ($('dragonevo_failuremessage').visible()) {
		Effect.Queues.get(Devo.effect_queues.failedmessage).each(function(effect) {effect.cancel();});
		new Effect.Pulsate('dragonevo_failuremessage', {duration: 1, pulses: 4});
	} else {
		new Effect.Appear('dragonevo_failuremessage', {queue: {position: 'end', scope: Devo.effect_queues.failedmessage, limit: 2}, duration: 0.2});
	}
	new Effect.Fade('dragonevo_failuremessage', {queue: {position: 'end', scope: Devo.effect_queues.failedmessage, limit: 2}, delay: 30, duration: 0.2});
};

Devo.Main.Helpers.Message.success = function(title, content) {
	$('dragonevo_successmessage_title').update(title);
	$('dragonevo_successmessage_content').update(content);
	if (title || content) {
		if ($('dragonevo_failuremessage').visible()) {
			Effect.Queues.get(Devo.effect_queues.failedmessage).each(function(effect) {effect.cancel();});
			new Effect.Fade('dragonevo_failuremessage', {queue: {position: 'end', scope: Devo.effect_queues.failedmessage, limit: 2}, duration: 0.2});
		}
		if ($('dragonevo_successmessage').visible()) {
			Effect.Queues.get(Devo.effect_queues.successmessage).each(function(effect) {effect.cancel();});
			new Effect.Pulsate('dragonevo_successmessage', {duration: 1, pulses: 4});
		} else {
			new Effect.Appear('dragonevo_successmessage', {queue: {position: 'end', scope: Devo.effect_queues.successmessage, limit: 2}, duration: 0.2});
		}
		new Effect.Fade('dragonevo_successmessage', {queue: {position: 'end', scope: Devo.effect_queues.successmessage, limit: 2}, delay: 10, duration: 0.2});
	} else if ($('dragonevo_successmessage').visible()) {
		Effect.Queues.get(Devo.effect_queues.successmessage).each(function(effect) {effect.cancel();});
		new Effect.Fade('dragonevo_successmessage', {queue: {position: 'end', scope: Devo.effect_queues.successmessage, limit: 2}, duration: 0.2});
	}
};

Devo.Main.Helpers.Dialog.show = function(title, content, options) {
	Devo.Main.Helpers.Message.clear();
	$('dialog_title').update(title);
	$('dialog_content').update(content);
	$('dialog_yes').setAttribute('href', 'javascript:void(0)');
	$('dialog_no').setAttribute('href', 'javascript:void(0)');
	$('dialog_yes').stopObserving('click');
	$('dialog_no').stopObserving('click');
	if (options['yes']['click']) {
		$('dialog_yes').observe('click', options['yes']['click']);
	}
	if (options['yes']['href']) {
		$('dialog_yes').setAttribute('href', options['yes']['href']);
	}
	if (options['no']['click']) {
		$('dialog_no').observe('click', options['no']['click']);
	}
	if (options['no']['href']) {
		$('dialog_no').setAttribute('href', options['no']['href']);
	}
	$('dialog_backdrop_content').show();
	$('dialog_backdrop').appear({duration: 0.2});
}

Devo.Main.Helpers.Dialog.dismiss = function() {
	$('dialog_backdrop_content').fade({duration: 0.2});
	$('dialog_backdrop').fade({duration: 0.2});
}

Devo.Main.Helpers.popup = function(element) {
	var visible = $(element) && $(element).hasClassName('button-pressed');
	$$('.button.button-pressed').each(function(popup) {
		$(popup).removeClassName('button-pressed');
	});
	if (!visible && $(element)) {
		$(element).addClassName('button-pressed');
	}
}

Devo.Main.Helpers.ajax = function(url, options) {
	var params = (options.params) ? options.params : '';
	if (options.form && options.form != undefined) params = Form.serialize(options.form);
	if (options.additional_params) params += options.additional_params;
	var url_method = (options.url_method) ? options.url_method : 'post';

	new Ajax.Request(url, {
		asynchronous: true,
		method: url_method,
		parameters: params,
		evalScripts: true,
		onLoading: function () {
			if (options.loading) {
				if ($(options.loading.indicator)) {
					$(options.loading.indicator).show();
				}
				Devo.Core._processCommonAjaxPostEvents(options.loading);
				if (options.loading.callback) {
					options.loading.callback();
				}
			}
		},
		onSuccess: function (response) {
			var json = response.responseJSON;
			if (json || (options.success && options.success.update)) {
				if (json && json.forward != undefined) {
					document.location = json.forward;
				} else {
					if (options.success && options.success.update) {
						var json_content_element = (is_string(options.success.update) || options.success.update.from == undefined) ? 'content' : options.success.update.from;
						var content = (json) ? json[json_content_element] : response.responseText;
						var update_element = (is_string(options.success.update)) ? options.success.update : options.success.update.element;
						if ($(update_element)) {
							var insertion = (is_string(options.success.update)) ? false : (options.success.update.insertion) ? options.success.update.insertion : false;
							if (insertion) {
								$(update_element).insert(content);
							} else {
								$(update_element).update(content);
							}
						}
						if (json && json.message) {
							Devo.Main.Helpers.Message.success(json.message);
						}
					} else if (options.success && options.success.replace) {
						var json_content_element = (is_string(options.success.replace) || options.success.replace.from == undefined) ? 'content' : options.success.replace.from;
						var content = (json) ? json[json_content_element] : response.responseText;
						var replace_element = (is_string(options.success.replace)) ? options.success.replace : options.success.replace.element;
						if ($(replace_element)) {
							Element.replace(replace_element, content);
						}
						if (json && json.message) {
							Devo.Main.Helpers.Message.success(json.message);
						}
					} else if (json && (json.title || json.content)) {
						Devo.Main.Helpers.Message.success(json.title, json.content);
					} else if (json && (json.message)) {
						Devo.Main.Helpers.Message.success(json.message);
					}
					if (options.success) {
						Devo.Core._processCommonAjaxPostEvents(options.success);
						if (options.success.callback) {
							options.success.callback(json);
						}
					}
				}
			}
		},
		onFailure: function (response) {
			var json = (response.responseJSON) ? response.responseJSON : undefined;
			if (response.responseJSON) {
				Devo.Main.Helpers.Message.error(json.error, json.message);
			} else {
				if (Devo.debug) {
					$('csp-dbg-content').insert({top: response.responseText});
				}
			}
			if (options.failure) {
				Devo.Core._processCommonAjaxPostEvents(options.failure);
				if (options.failure.callback) {
					options.failure.callback(response);
				}
			}
		},
		onComplete: function (response) {
			if (Devo.debug) {
				$('csp-dbg-content').insert({top: response.responseJSON['csp-debugger']});
			}
			if (options.loading && options.loading.indicator && $(options.loading.indicator)) $(options.loading.indicator).hide();
			if (options.complete) {
				Devo.Core._processCommonAjaxPostEvents(options.complete);
				if (options.complete.callback) {
					var json = (response.responseJSON) ? response.responseJSON : undefined;
					options.complete.callback(json);
				}
			}
		}
	});
};

Devo.Main.Helpers.Backdrop.show = function(url) {
	$('fullpage_backdrop').appear({duration: 0.2});
	$$('body')[0].setStyle({'overflow': 'hidden'});
	$('loading').show();

	if (url != undefined) {
		Devo.Main.Helpers.ajax(url, {
			url_method: 'get',
			loading: {indicator: 'loading'},
			success: {
				update: 'fullpage_backdrop_content',
				callback: function () {
					$('fullpage_backdrop_content').appear({duration: 0.2});
					$('loading').fade({duration: 0.2});
				}},
			failure: {hide: 'fullpage_backdrop'}
		});
	}
};

Devo.Main.Helpers.Backdrop.reset = function() {
	$$('body')[0].setStyle({'overflow': 'auto'});
	$('fullpage_backdrop').fade({duration: 0.2});
//	Devo.Core._resizeWatcher();
};

Devo.Main.Helpers.tabSwitcher = function(element, visibletab) {
	var menu = $(element).up('ul').id;
	$(menu).childElements().each(function(item){item.removeClassName('selected');});
	$(visibletab).addClassName('selected');
	$(menu + '_panes').childElements().each(function(item){item.hide();});
	$(visibletab + '_pane').show();
};

Devo.Main.Login.register = function(url)
{
	Devo.Main.Helpers.ajax(url, {
		form: 'register_form',
		loading: {
			indicator: 'register_indicator',
			hide: 'register_button',
			callback: function() {
				$$('input.required').each(function(field) {
					$(field).setStyle({backgroundColor: ''});
				});
			}
		},
		success: {
			hide: 'register',
			update: {element: 'register_message', from: 'loginmessage'},
			show: 'register2'
		},
		failure: {
			show: 'register_button',
			callback: function(json) {
				json.fields.each(function(field) {
					$(field).setStyle({backgroundColor: '#FBB'});
				});
			}
		}
	});
}

Devo.Main.Profile.inviteUser = function() {
	if (!$('invite_email_button').hasClassName('disabled')) {
		Devo.Main.Helpers.ajax(Devo.options['say_url'], {
			additional_params: '&topic=invite_user&invite_email=' + $('invite_email_input').getValue(),
			loading: {
				callback: function() {
					$('invite_email_button').addClassName('disabled');
				}
			},
			complete: {
				callback: function() {
					$('invite_email_button').removeClassName('disabled');
					$('invite_email').hide();
				}
			}
		});
	}
}

Devo.Main.Profile.pickRace = function(race) {
	var card = $('race_'+race+'_div');
	var is_selected = card.hasClassName('selected');
	$('character_continue_button').disable();
	$$('.card').each(function(element) {
		if (element.id != card.id) {
			(is_selected) ? element.removeClassName('unselected') : element.addClassName('unselected');
		}
	});
	if (!is_selected) {
		card.addClassName('selected');
		$('race_input').setValue(race);
		$('character_continue_button').enable();
	} else {
		card.removeClassName('selected');
	}
};

Devo.Main.Profile.toggleSkillTraining = function(skill_id) {
	if ($('levelup_button').visible() && !$('skill_'+skill_id).hasClassName('trained')) {
		var prev = $('skill_'+skill_id).previous();
		if (!prev || prev.hasClassName('trained')) {
			$$('.skill.training').each(function(element) {
				if (element.id != 'skill_'+skill_id) element.removeClassName('training');
			});
			$('skill_'+skill_id).toggleClassName('training');
			$('selected_skill').setValue(skill_id);
		}
	}
	if ($$('.skill.training').size() > 0) {
		$('levelup_button').removeClassName('disabled');
	} else {
		$('levelup_button').addClassName('disabled');
		$('selected_skill').setValue('');
	}
};

Devo.Main.Profile.trainSelectedSkill = function() {
	if (!$('levelup_button').hasClassName('disabled')) {
		Devo.Main.Helpers.ajax(Devo.options['say_url'], {
			additional_params: '&topic=train_skill&selected_skill=' + $('selected_skill').getValue(),
			loading: {
				callback: function() {
					$('levelup_button').addClassName('disabled');
					$('training_indicator').show();
				}
			},
			success: {
				callback: function(json) {
					if (json['levelup']) $('levelup_button').removeClassName('disabled');
					$$('.skill.training').each(function(element) {
						element.removeClassName('training');
					});
					if (json['skill_trained']) {
						var skill = $('skill_'+json['skill_trained']);
						skill.addClassName('trained');
					}
					if (json['levelup_available'] == false) {
						$('no_levelup').show();
						$('levelup_button').hide();
					}
				}
			},
			complete: {
				callback: function() {
					$('training_indicator').hide();
				}
			}
		});
	}
};

Devo.Main.saveSettings = function() {
	var settings = Form.serialize('options_form');
	Devo.Main.Helpers.ajax(Devo.options['say_url'], {
		additional_params: settings,
		loading: {indicator: 'options_waiting'},
		success: {
			hide: 'settings-overlay',
			callback: function() {
				if ($('options_background_music_enabled').checked && !Devo.Game._music) {
					Devo.Game._initializeMusic();
				} else if ($('options_background_music_disabled').checked) {
					Devo.Game._uninitializeMusic();
				}
				if ($('options_system_chat_messages_disabled').checked && !$('game_chat').hasClassName('no_system_chat')) {
					$('game_chat').addClassName('no_system_chat');
				} else if ($('options_system_chat_messages_enabled').checked) {
					$('game_chat').removeClassName('no_system_chat');
				}
			}
		}
	});
}

Devo.Core.Pollers.Callbacks.invitePoller = function() {
	if (!Devo.Core.Pollers.Locks.invitepoller) {
		Devo.Main.Helpers.ajax(Devo.options['ask_url'], {
			additional_params: '&for=game_invites',
			form: 'existing_game_invites',
			loading: {
				callback: function() {
					Devo.Core.Pollers.Locks.invitepoller = true;
				}
			},
			success: {
				callback: function(json) {
					if (json.removed_invites) {
						for (var d in json.removed_invites) {
							if (json.removed_invites.hasOwnProperty(d)) {
								var invite_id = d;
								Devo.Play.removeInvite(invite_id);
							}
						}
					}
					if (json.invites) {
						for (var d in json.invites) {
							if (json.invites.hasOwnProperty(d)) {
								var invite = json.invites[d];
								$('existing_game_invites').insert('<input type="hidden" id="invites_input_'+invite.invite_id+'" name="invites['+invite.invite_id+']" value="'+invite.invite_id+'">');
								var invite_element = $('__game_invite_template').clone(true);
								invite_element.id = 'game_invite_' + invite.invite_id;
								var accept_button = $(invite_element).down('.buttons').down('.button-accept');
								accept_button.observe('click', function(event) {
									var button = Event.element(event);
									Devo.Play.acceptInvite(invite.invite_id, $(button));
								});
								var reject_button = $(invite_element).down('.buttons').down('.button-reject');
								reject_button.observe('click', function(event) {
									var button = Event.element(event);
									Devo.Play.rejectInvite(invite.invite_id, $(button));
								});
								$(invite_element).insert('<input type="hidden" name="invite_id" value="'+invite.invite_id+'">');
								$(invite_element).down('.player_name').update(invite.player_name);
								$(invite_element).show();
								$('game_invites').insert(invite_element);
							}
						}
						window.setTimeout( function() {
							for (var d in json.invites) {
								if (json.invites.hasOwnProperty(d)) {
									var invite = json.invites[d];
									$('game_invite_' + invite.invite_id).addClassName('visible animated fadeInLeft');
								}
							}
						}, 100);
					}
				}
			},
			complete: {
				callback: function() {
					Devo.Core.Pollers.Locks.invitepoller = false;
				}
			}
		});
	}
};

Devo.Core.Pollers.Callbacks.chatLinesPoller = function() {
	if (!Devo.Core.Pollers.Locks.chatlinespoller) {
		Devo.Main.Helpers.ajax(Devo.options['ask_url'], {
			additional_params: '&for=chat_lines',
			form: 'chat_rooms_joined',
			loading: {
				callback: function() {
					Devo.Core.Pollers.Locks.chatlinespoller = true;
				}
			},
			success: {
				callback: function(json) {
					if (json.chat_lines) {
						for (var d in json.chat_lines) {
							if (json.chat_lines.hasOwnProperty(d)) {
								var room = json.chat_lines[d];
								var room_id = d;
								var blinking = $('chat_room_'+room_id+'_loading').visible();
								var is_empty = $('chat_room_'+room_id+'_lines').childElements().size() == 0;
								for (var l in room['lines']) {
									if (room['lines'].hasOwnProperty(l)) {
										var line = room['lines'][l];
										var line_id = line['line_id'];
										if (!$('chat_line_'+line_id)) {
											$('chat_room_'+room_id+'_since').setValue(line_id);
											var chat_line = '<div id="chat_line_'+line_id+'" class="chat_line';
											if (line['user_id'] == 0) chat_line += ' system';
											chat_line += '"><div class="chat_nickname">';
											if (line['user_id'] != Devo.options['user_id'] && line['user_id'] > 0) {
												chat_line += '<div class="tooltip lighter">';

												if (line['user_charactername']) {
													chat_line += line['user_charactername']+' ('+line['user_username']+')';
												} else {
													chat_line += 'Username: '+line['user_username'];
												}

												chat_line += '<br>Level '+line['user_level'];

												if (line['race'] != '') {
													chat_line += ' '+line['user_race'];
												}

												chat_line += '<br><div class="buttons"><button class="button button-standard" onclick="Devo.Play.invite('+line['user_id']+', this);"><img src="/images/spinning_16.gif" style="display: none;">Invite to game</button></div></div>';
											}
											chat_line += line['user_username']+'&nbsp;<span class="chat_timestamp">('+line['posted_formatted_hours']+'<span class="date"> - '+line['posted_formatted_date']+'</span>)</div><div class="chat_line_content">'+Devo.Chat.emotify(line['text'])+'</div></div>';
											$('chat_room_'+room_id+'_lines').insert(chat_line);
											$('chat_room_'+room_id+'_lines').scrollTop = $('chat_line_'+line_id).offsetTop;
											if (room_id == 1 && !is_empty && !$('lobby_chat_toggler').hasClassName('selected')) {
												$('lobby_chat_toggler').down('.notify').addClassName('visible');
											} else if (room_id > 1 && !is_empty && line['user_id'] != Devo.options['user_id']) {
												Devo.Chat.Bubbles.push({id: line_id, text: line['text']});
												Devo.Chat._initializeBubblePoller();
											}
											if (!blinking && !Devo.Core._infocus && line['user_id'] > 0) {
												clearInterval(Devo.Core._titleBlinkInterval);
												Devo.options.alternate_title = line['user_username'] + ' says ...';
												Devo.Core._titleBlinkInterval = setInterval(Devo.Core._blinkTitle, 2000);
												blinking = true;
											}
										}
									}
								}
							}
						}
					}
				}
			},
			complete: {
				callback: function(json) {
					if (json.chat_lines) {
						for (var d in json.chat_lines) {
							if (json.chat_lines.hasOwnProperty(d)) {
								var room_id = d;
								if ($('chat_room_'+room_id+'_loading').visible()) {
									$('chat_room_'+room_id+'_loading').hide();
								}
								$('chat_room_'+room_id+'_num_users').update(json.chat_lines[d]['users']['count']);
								$('chat_room_'+room_id+'_num_ingame_users').update(json.chat_lines[d]['users']['ingame_count']);
							}
						}
					}
					if ($('fullpage_backdrop').visible()) $('fullpage_backdrop').hide();
					Devo.Core.Pollers.Locks.chatlinespoller = false;
				}
			}
		});
	}
};

Devo.Core.Pollers.Callbacks.chatUsersPoller = function() {
	if (!Devo.Core.Pollers.Locks.chatuserspoller) {
		Devo.Main.Helpers.ajax(Devo.options['ask_url'], {
			additional_params: '&for=chat_users',
			form: 'chat_rooms_joined',
			loading: {
				callback: function() {
					Devo.Core.Pollers.Locks.chatuserspoller = true;
				}
			},
			success: {
				callback: function(json) {
					if (json.chat_users) {
						for (var d in json.chat_users) {
							if (json.chat_users.hasOwnProperty(d)) {
								var room = json.chat_users[d];
								var room_id = d;
								if ($('chat_room_'+room_id+'_users_loading') && $('chat_room_'+room_id+'_users_loading').visible()) $('chat_room_'+room_id+'_users_loading').hide();
								$('chat_room_'+room_id+'_users').childElements().each(function(userdiv) {
									if (!room['users'][userdiv.dataset.userId]) {
										$(userdiv).remove();
									}
								});
								for (var u in room['users']) {
									if (room['users'].hasOwnProperty(u)) {
										var user = room['users'][u];
										var user_id = user['user_id'];
										if (!$('chat_room_'+room_id+'_user_'+user_id)) {
											var user_line = '<div id="chat_room_'+room_id+'_user_'+user_id+'" class="chat_nickname';
											if (user['is_admin']) user_line += ' is_admin';
											user_line += '">';
											if (user_id != Devo.options['user_id']) {
												user_line += '<div class="tooltip lighter">';

												if (user['charactername']) {
													user_line += user['charactername']+' ('+user['username']+')';
												} else {
													user_line += 'Username: '+user['username'];
												}
												
												user_line += '<br>Level '+user['level'];

												if (user['race'] != '') {
													user_line += ' '+user['race'];
												}

												user_line += '<br><div class="buttons"><button class="button button-standard" onclick="Devo.Play.invite('+user_id+', this);"><img src="/images/spinning_16.gif" style="display: none;">Invite to game</button></div></div>';
											}
											user_line += user['username']+'</div></div>';
											if (user['is_admin']) {
												$('chat_room_'+room_id+'_users').insert({top: user_line});
											} else {
												$('chat_room_'+room_id+'_users').insert(user_line);
											}
											$('chat_room_'+room_id+'_user_'+user_id).dataset.userId = user_id;
										}
									}
								}
							}
						}
					}
				}
			},
			complete: {
				callback: function(json) {
					if (json.chat_users) {
						for (var d in json.chat_users) {
							if (json.chat_users.hasOwnProperty(d)) {
								var room_id = d;
								$('chat_room_'+room_id+'_num_users').update(json.chat_users[d]['count']);
								$('chat_room_'+room_id+'_num_ingame_users').update(json.chat_users[d]['ingame_count']);
							}
						}
					}
					Devo.Core.Pollers.Locks.chatuserspoller = false;
				}
			}
		});
	}
};

Devo.Core.Pollers.Callbacks.quickMatchPoller = function() {
	if (!Devo.Core.Pollers.Locks.quickmatchpoller) {
		Devo.Main.Helpers.ajax(Devo.options['ask_url'], {
			additional_params: '&for=quickmatch',
			form: 'chat_rooms_joined',
			loading: {
				callback: function() {
					Devo.Core.Pollers.Locks.quickmatchpoller = true;
				}
			},
			complete: {
				callback: function() {
					Devo.Core.Pollers.Locks.quickmatchpoller = false;
				}
			}
		});
	}
};

Devo.Core.Pollers.Callbacks.gameListPoller = function() {
	if (!Devo.Core.Pollers.Locks.gamelistpoller) {
		Devo.Main.Helpers.ajax(Devo.options['ask_url'], {
			additional_params: '&for=gamelist',
			form: 'my_ongoing_games_form',
			loading: {
				callback: function() {
					Devo.Core.Pollers.Locks.gamelistpoller = true;
				}
			},
			success: {
				callback: function(json) {
					if (json.games) {
						for (var d in json.games) {
							if (json.games.hasOwnProperty(d)) {
								var game = json.games[d];
								var game_id = d;
								if ($('game_'+game_id+'_opponent_turn')) {
									(game.turn.opponent && game.invitation_confirmed) ? $('game_'+game_id+'_opponent_turn').show() : $('game_'+game_id+'_opponent_turn').hide();
									(game.turn.player && game.invitation_confirmed) ? $('game_'+game_id+'_player_turn').show() : $('game_'+game_id+'_player_turn').hide();
									if (game.invitation_confirmed) {
										$('game_'+game_id+'_invitation_unconfirmed').hide();
										var button_play = $('game_'+game_id+'_list').down('.button-play');
										button_play.removeClassName('disabled');
										button_play.enable();
										var button_cancel = $('game_'+game_id+'_list').down('.button-cancel');
										button_cancel.hide();
									} else if (game.invitation_rejected) {
										$('game_'+game_id+'_invitation_rejected').show();
										$('game_'+game_id+'_invitation_unconfirmed').hide();
										$('game_'+game_id+'_list').addClassName('rejected');
									} else {
										$('game_'+game_id+'_invitation_unconfirmed').show();
									}
								}
							}
						}
					}
				}
			},
			complete: {
				callback: function() {
					Devo.Core.Pollers.Locks.gamelistpoller = false;
				}
			}
		});
	}
};

Devo.Core._initializeInvitePoller = function() {
	if ($('existing_game_invites') && $('__game_invite_template')) {
		Devo.Core.Pollers.invitepoller = new PeriodicalExecuter(Devo.Core.Pollers.Callbacks.invitePoller, 15);
		Devo.Core.Pollers.Callbacks.invitePoller();
	}
}

Devo.Core._initializeChatRoomPoller = function() {
	if ($('chat_rooms_joined')) {
		Devo.Core.Pollers.chatlinespoller = new PeriodicalExecuter(Devo.Core.Pollers.Callbacks.chatLinesPoller, 3);
		Devo.Core.Pollers.chatuserspoller = new PeriodicalExecuter(Devo.Core.Pollers.Callbacks.chatUsersPoller, 7);
	}
}

Devo.Core._initializeGameListPoller = function() {
	if ($('my_ongoing_games')) {
		Devo.Core.Pollers.gamelistpoller = new PeriodicalExecuter(Devo.Core.Pollers.Callbacks.gameListPoller, 10);
		Devo.Core.Pollers.Callbacks.gameListPoller();
	}
}

Devo.Core._initializeQuickmatchPoller = function() {
	Devo.Core.Pollers.quickmatchpoller = new PeriodicalExecuter(Devo.Core.Pollers.Callbacks.quickMatchPoller, 5);
}

Devo.Core._destroyQuickmatchPoller = function() {
	Devo.Core.Pollers.quickmatchpoller.stop();
	Devo.Core.Pollers.Locks.quickmatchpoller = undefined;
}

Devo.Core.initialize = function(options) {
	Devo.options = options;
	Devo.Core._initializeInvitePoller();
	Devo.Core._infocus = true;
	Devo.Core._isOldTitle = true;
	Devo.Core._titleBlinkInterval = undefined;
	Event.observe(window, 'focus', Devo.Core._stopBlinkTitle);
	Event.observe(window, 'blur', function() {Devo.Core._infocus = false;});
	Devo.Core.Events.trigger('devo:core:initialized');
}

Devo.Main._lobbyResizeWatcher = function() {
	var lobby_chat = $('lobby_chat');
	var chat_users = $('chat_room_1_users');
	var chat_lines = $('chat_room_1_lines');
	var chat_room = $('chat_room_1_container');
	var chat_form = $('chat_room_1_form_container');
	var chat_button = $('chat_room_1_say_button');
	var chat_input = $('chat_room_1_input');
	var vp_height = document.viewport.getHeight();
	var vp_width = document.viewport.getWidth();
	var lobby_chat_width = vp_width - 260;
	var lobby_chat_height = vp_height - 65;
	lobby_chat.setStyle({width: lobby_chat_width + 'px', height: lobby_chat_height + 'px'});
	var chat_form_layout = chat_form.getLayout();
	var chat_users_layout = chat_users.getLayout();
	var chat_button_layout = chat_button.getLayout();
	var chat_users_width = chat_users_layout.get('width') + chat_users_layout.get('padding-left') + chat_users_layout.get('padding-right');

	var chat_lines_width = lobby_chat_width - chat_users_width - 20;
	var chat_lines_height = lobby_chat_height - 20 - chat_form_layout.get('height');
	var chat_input_width = chat_lines_width - chat_button_layout.get('width') - chat_button_layout.get('padding-left') - chat_button_layout.get('padding-right') - 30;
	chat_lines.setStyle({width: chat_lines_width + 'px', height: chat_lines_height + 'px'});
	chat_form.setStyle({width: chat_lines_width + 'px'});
	chat_users.setStyle({height: (chat_lines_height + 5) + 'px'});
	chat_input.setStyle({width: chat_input_width + 'px'});
	chat_room.setStyle({height: (chat_lines_height + chat_form_layout.get('height') - 15) + 'px'});
};

Devo.Main.initializeLobby = function(options) {
	Devo.Core._initializeChatRoomPoller();
	Devo.Core._initializeGameListPoller();
	Event.observe(window, 'resize', Devo.Main._lobbyResizeWatcher);
	Devo.Main._lobbyResizeWatcher();
	if (options == undefined || options.noselect == undefined || !options.noselect) {
		$('profile_menu_strip').childElements().each(function(element) {
			element.removeClassName('selected');
		});
		$('lobby_chat_toggler').addClassName('selected');
	}
}

Devo.Admin.Users.resetCards = function(user_id) {
	var form = $('users_form');
	var url = form.action;
	Devo.Main.Helpers.ajax(url, {
		additional_params: '&topic=reset_user_cards&user_id=' + user_id,
		loading: {indicator: 'user_'+user_id+'_indicator'},
		success: {
			callback: function() { Devo.Main.Helpers.popup(); }
		}
	});
};

Devo.Admin.Users.removeCards = function(user_id) {
	var form = $('users_form');
	var url = form.action;
	Devo.Main.Helpers.ajax(url, {
		additional_params: '&topic=remove_user_cards&user_id=' + user_id,
		loading: {indicator: 'user_'+user_id+'_indicator'},
		success: {
			callback: function() { Devo.Main.Helpers.popup(); }
		}
	});
};

Devo.Admin.Users.generatePotionPack = function(user_id) {
	var form = $('users_form');
	var url = form.action;
	Devo.Main.Helpers.ajax(url, {
		additional_params: '&topic=user_new_potion_pack&user_id=' + user_id,
		loading: {indicator: 'user_'+user_id+'_indicator'},
		success: {
			callback: function() { Devo.Main.Helpers.popup(); }
		}
	});
};

Devo.Admin.Users.generateStarterPack = function(user_id, faction) {
	var form = $('users_form');
	var url = form.action;
	Devo.Main.Helpers.ajax(url, {
		additional_params: '&topic=user_new_starter_pack&user_id=' + user_id + '&faction=' + faction,
		loading: {indicator: 'user_'+user_id+'_indicator'},
		success: {
			callback: function() { Devo.Main.Helpers.popup(); }
		}
	});
};

Devo.Admin.Cards.saveAttack = function(form) {
	form = $(form);
	var attack_id = form.down('input[name=attack_id]').getValue();
	var url = form.action;
	var cb = (attack_id) ? {replace: 'admin_card_attack_'+attack_id} : {update: {element: 'admin_card_attacks', insertion: true}};
	cb.callback = Devo.Main.Helpers.Backdrop.reset;
	cb.hide = 'card_no_attacks';
	Devo.Main.Helpers.ajax(url, {
		form: form.id,
		loading: {indicator: 'save_attack_indicator'},
		success: cb
	});
};

Devo.Chat.joinRoom = function(room_id) {
	$('chat_rooms_joined').insert('<input type="hidden" name="rooms['+room_id+']" value="'+room_id+'">');	
	$('chat_rooms_joined').insert('<input id="chat_room_'+room_id+'_since" type="hidden" name="since['+room_id+']" value="">');
};

Devo.Chat.say = function(form) {
	form = $(form);
	if (form.down('input[type=text]').value != '') {
		var url = form.action;
		var indicator = form.down('img');
		var say_button = $(form.down('input[type=submit]'));
		Devo.Main.Helpers.ajax(url, {
			form: form.id,
			loading: {
				indicator: indicator.id,
				callback: function() {
					say_button.disable();
					say_button.addClassName('disabled');
					form.down('input[type=text]').value = '';
				}
			},
			success: {
				callback: function() {
					Devo.Core.Pollers.Callbacks.chatLinesPoller();
					say_button.enable();
					say_button.removeClassName('disabled');
				}
			}
		});
	}
};

Devo.Chat.emotify = function(text) {
	for (var image in Devo.Chat.emoticons) {
		var regex = Devo.Chat.emoticons[image];
		regex.each(function(r) {
			text = text.gsub(r, '<img src="/images/smileys/'+image+'.png">');
		});
	}

	return text + ' ';
}

Devo.Core.Pollers.Callbacks.gameDataPoller = function() {
	if (!Devo.Core.Pollers.Locks.gamedatapoller && Devo.Game.Events.size() <= 2) {
		Devo.Main.Helpers.ajax(Devo.options['ask_url'], {
			additional_params: '&for=game_data&game_id='+Devo.Game._id+'&latest_event_id='+Devo.Game._latest_event_id,
			loading: {
				callback: function() {
					Devo.Core.Pollers.Locks.gamedatapoller = true;
				}
			},
			success: {
				callback: function(json) {
					if (json.game.events.size() > 0) {
						Devo.Game.processGameEvents(json.game.events);
						Devo.Game._initializeEventPlaybackPoller();
					}
					Devo.Game.data = json.game.data;
					if (!$('board-container').hasClassName('in-play')) $('board-container').addClassName('in-play');
				}
			},
			complete: {
				callback: function() {
					Devo.Core.Pollers.Locks.gamedatapoller = false;
					$('fullpage_backdrop').hide();
				}
			}
		});
	}
};

Devo.Core.Pollers.Callbacks.bubblePoller = function() {
	if (!Devo.Core.Pollers.Locks.bubblepoller && Devo.Chat.Bubbles.size() > 0) {
		var avatar = $$('.avatar.opponent')[0];
		Devo.Core.Pollers.Locks.bubblepoller = true;
		var line = Devo.Chat.Bubbles.shift();
		var bubble = '<div class="tooltip bubble active" id="bubble-'+line['id']+'"><div class="bubble_content">'+Devo.Chat.emotify(line['text'])+'</div></div>';
		avatar.insert(bubble);
		window.setTimeout(function() {
			$('bubble-'+line['id']).remove();
			Devo.Core.Pollers.Locks.bubblepoller = false;
		}, 6500);
	} else if (Devo.Chat.Bubbles.size() == 0) {
		Devo.Core.Pollers.bubblepoller = null;
	}
};

Devo.Core.Pollers.Callbacks.eventPlaybackPoller = function() {
	if (!Devo.Core.Pollers.Locks.eventplaybackpoller && Devo.Game.Events.size() > 0) {
		Devo.Core.Pollers.Locks.eventplaybackpoller = true;
		var event = Devo.Game.Events.shift();
		Devo.Game._current_event = event;
		if (!$('event_' + event.id + '_container') && event.type != 'player_change' && (event.current_turn > 2 || Devo.Game._current_turn > 2)) {
			$('game_event_contents').insert(event.event_content);
			$('last-event').update($('event_' + event.id + '_container').innerHTML);
			$('game_events').scrollTop = $('game_events').scrollHeight;
			window.setTimeout(function() {
				$('last-event').removeClassName('fadeOut');
				$('last-event').addClassName('fadeIn');
				window.setTimeout(function() {
					$('last-event').removeClassName('fadeIn');
					$('last-event').addClassName('fadeOut');
				}, 5000);
			}, 100);
		}
		switch (event.type) {
			case 'player_change':
				Devo.Game.processPlayerChange(event.data);
				break;
			case 'thinking':
				Devo.Game.processThinking(event.data);
				break;
			case 'phase_change':
				Devo.Game.processPhaseChange(event.data, event.id);
				break;
			case 'card_moved_off_slot':
				Devo.Game.processCardMovedOffSlot(event.data);
				break;
			case 'card_moved_onto_slot':
				Devo.Game.processCardMovedOntoSlot(event.data);
				break;
			case 'replenish':
				Devo.Game.processReplenish(event.data);
				break;
			case 'attack':
				Devo.Game.processAttack(event.data);
				break;
			case 'end_attack':
				Devo.Game.processEndAttack(event.data);
				break;
			case 'damage':
				Devo.Game.processDamage(event.data);
				break;
			case 'player_online':
				Devo.Game.processUserOnline(event.data);
				break;
			case 'player_offline':
				Devo.Game.processUserOffline(event.data);
				break;
			case 'restore_health':
				Devo.Game.processRestoreHealth(event.data);
				break;
			case 'restore_energy':
				Devo.Game.processRestoreEnergy(event.data);
				break;
			case 'apply_effect':
				Devo.Game.processApplyEffect(event.data);
				break;
			case 'remove_effect':
				Devo.Game.processRemoveEffect(event.data);
				break;
			case 'steal_gold':
				Devo.Game.processStealGold(event.data);
				break;
			case 'generate_gold':
				Devo.Game.processGenerateGold(event.data);
				break;
			case 'steal_ep':
				Devo.Game.processStealEP(event.data);
				break;
			case 'card_removed':
				Devo.Game.processCardRemoved(event.data);
				break;
			case 'game_over':
				Devo.Game.processGameOver(event.data);
				break;
			default:
				Devo.Core.Pollers.Locks.eventplaybackpoller = false;
		}
	} else if (Devo.Game.Events.size() == 0) {
		Devo.Core.Pollers.eventplaybackpoller = null;
	}
}

Devo.Game._initializeGameDataPoller = function() {
	Devo.Game.data = {};
	Devo.Core.Pollers.gamedatapoller = new PeriodicalExecuter(Devo.Core.Pollers.Callbacks.gameDataPoller, 2);
};

Devo.Game._initializeEventPlaybackPoller = function() {
	Devo.Core.Pollers.eventplaybackpoller = new PeriodicalExecuter(Devo.Core.Pollers.Callbacks.eventPlaybackPoller, 0.2);
};

Devo.Chat._initializeBubblePoller = function() {
	if (Devo.Core.Pollers.bubblepoller == null || Devo.Core.Pollers.bubblepoller == undefined) {
		Devo.Core.Pollers.bubblepoller = new PeriodicalExecuter(Devo.Core.Pollers.Callbacks.bubblePoller, 0.2);
	}
};

Devo.Game._initializeCards = function() {
	var cards = document.querySelectorAll('.card.creature');
	[].forEach.call(cards, function(card) {
		Devo.Game.updateCardAttackAvailability($(card));
	});
	if (Devo.Game._movable) {
		Devo.Game._initializeDragDrop();
	} else if (Devo.Game._actions && Devo.Game._actions_remaining > 0) {
		Devo.Game._initializeActions();
	}
	Devo.Game._initializePotions();
};

Devo.Game._initializeCardDragDrop = function(card) {
	card.addEventListener('dragstart', Devo.Game.card_dragstart, false);
	card.addEventListener('dragover', Devo.Game.card_dragover, false);
	card.addEventListener('dragend', Devo.Game.card_dragend, false);
	$(card).addClassName('movable');
};

Devo.Game._initializeDragDrop = function() {
	if (Devo.Game._movable == true) {
		var selector_classes_slots = '.player .card.creature, .player .card.equippable_item';
		var selector_classes_hand = '#player_hand .card.creature, #player_hand .card.equippable_item';
		var cards = document.querySelectorAll(selector_classes_slots);
		[].forEach.call(cards, function(card) {
			if (!$(card).hasClassName('effect-stun')) {
				card.dataset.originalPosition = $(card).up().id;
				Devo.Game._initializeCardDragDrop(card);
			}
		});
		var hand_cards = document.querySelectorAll(selector_classes_hand);
		[].forEach.call(hand_cards, function(card) {
			Devo.Game._initializeCardDragDrop(card);
		});
		var cardslots = document.querySelectorAll('#player-slots .card-slot');
		[].forEach.call(cardslots, function(cardslot) {
			var card = $(cardslot).down('.card');
			if (!card || !$(card).hasClassName('effect-stun')) {
				cardslot.addEventListener('dragover', Devo.Game.cardslot_dragover, false);
				cardslot.addEventListener('dragleave', Devo.Game.cardslot_dragleave, false);
				cardslot.addEventListener('drop', Devo.Game.cardslot_drop, false);
			}
		});
		var phand = $('player_stuff');
		phand.addEventListener('dragover', Devo.Game.cardslot_dragover, false);
		phand.addEventListener('dragleave', Devo.Game.cardslot_dragleave, false);
		phand.addEventListener('drop', Devo.Game.cardslot_drop, false);
	}
};

Devo.Game._uninitializeDragDrop = function() {
	var cards = document.querySelectorAll('.player .card');
	[].forEach.call(cards, function(card) {
		card.removeEventListener('dragstart', Devo.Game.card_dragstart);
		card.removeEventListener('dragover', Devo.Game.card_dragover);
		card.removeEventListener('dragend', Devo.Game.card_dragend);
		$(card).removeClassName('movable');
	});
	var cardslots = document.querySelectorAll('.card-slots .card-slot');
	[].forEach.call(cardslots, function(cardslot) {
		cardslot.removeEventListener('dragover', Devo.Game.cardslot_dragover);
		cardslot.removeEventListener('dragleave', Devo.Game.cardslot_dragleave);
		cardslot.removeEventListener('drop', Devo.Game.cardslot_drop);
	});
};

Devo.Game._initializeCardActions = function(card) {
	if (card.hasClassName('creature')) card.observe('click', Devo.Game.toggleActionCard);
	card.down('.attacks').childElements().each(function(attack) {
		if (!$(attack).hasClassName('disabled')) {
			$(attack).observe('click', Devo.Game.initiateAttack);
		}
	});
};

Devo.Game._initializeActions = function() {
	var cards = document.querySelectorAll('.player .card.creature.placed');
	[].forEach.call(cards, function(card) {
		if (!$(card).hasClassName('effect-stun')) {
			Devo.Game._initializeCardActions($(card));
		}
	});
	$('player-slots').addClassName('actionable');
	$('player_stuff').addClassName('actionable');
};

Devo.Game._initializePotions = function() {
	var cards = document.querySelectorAll('.card.potion_item');
	[].forEach.call(cards, function(card) {
		var p_card = $(card).previous();
		if (p_card && p_card.dataset.originalCardId != $(card).dataset.originalCardId) p_card.addClassName('split');
		$(card).down('.attacks').childElements().each(function(attack) {
			$(attack).observe('click', Devo.Game.initiateAttack);
		});
	});
};

Devo.Game._uninitializeActions = function() {
	var cards = document.querySelectorAll('.player .card.placed');
	[].forEach.call(cards, function(card) {
		$(card).stopObserving('click', Devo.Game.toggleActionCard);
		if ($(card).hasClassName('creature')) {
			$(card).down('.attacks').childElements().each(function(attack) {
				$(attack).stopObserving('click', Devo.Game.initiateAttack);
			});
		}
	});
	$('player-slots').removeClassName('actionable');
	$('player_stuff').removeClassName('actionable');
};

Devo.Game.getCard = function(card_id, cb) {
	Devo.Main.Helpers.ajax(Devo.options['ask_url'], {
		additional_params: '&for=card&game_id='+Devo.Game._id+'&card_id='+card_id,
		success: {
			callback: cb
		}
	});
}

Devo.Game.Effects.cardAppear = function(card) {
	if (!card.hasClassName('medium')) card.addClassName('medium');
	window.setTimeout(function() {
		card.show();
		card.addClassName('animated fadeInDownBig');
		window.setTimeout(function() {
			card.writeAttribute('style', '');
			card.removeClassName('animated fadeInDownBig');
			Devo.Core.Pollers.Locks.eventplaybackpoller = false;
		}, 1200);
	}, 100);
};

Devo.Game.Effects.cardFade = function(card) {
	window.setTimeout(function() {
		card.writeAttribute('style', '');
		var fadeclass = (card.hasClassName('player')) ? 'fadeOutDownBig' : 'fadeOutUpBig';
		card.addClassName('animated '+fadeclass);
		window.setTimeout(function() {
			card.hide();
			card.removeClassName('animated '+fadeclass);
			card.removeClassName('medium');
			Devo.Core.Pollers.Locks.eventplaybackpoller = false;
		}, 1200);
	}, 100);
};

Devo.Game.Effects.useGold = function(cost) {
	var gg = $('game-gold-amount');
	var gold = parseInt(gg.innerHTML);
	$('game-gold').dataset.amount = cost.to;

	if (gold != cost.to) {
		gg.update(gold+'<div class="negative fadeOutUp diff animated">'+cost.diff+'</div>');
		window.setTimeout(function() {
			gg.update(cost.to);
			$$('.card.player').each(function(c) {
				Devo.Game.updateCardAttackAvailability(c);
			});
		}, 1000);
	}
}

Devo.Game.Effects.stolenGold = function(cost) {
	var gg = $('game-gold-amount');
	var gold = parseInt(gg.innerHTML);
	
	cost.to = parseInt($('game-gold').dataset.amount) - parseInt(cost.diff);
	$('game-gold').dataset.amount = cost.to;

	if (gold != cost.to) {
		gg.update(gold+'<div class="negative fadeOutUp diff animated">'+cost.diff+'</div>');
		window.setTimeout(function() {
			gg.update(cost.to);
			$$('.card.player').each(function(c) {
				Devo.Game.updateCardAttackAvailability(c);
			});
		}, 1000);
	}
}

Devo.Game.Effects.getGold = function(cost) {
	var gg = $('game-gold-amount');
	var gold = parseInt(gg.innerHTML);
	$('game-gold').dataset.amount = cost.to;

	if (gold != cost.to) {
		gg.update(gold+'<div class="fadeInDown diff animated">'+cost.diff+'</div>');
		window.setTimeout(function() {
			gg.update(cost.to);
			$$('.card.player').each(function(c) {
				Devo.Game.updateCardAttackAvailability(c);
			});
		}, 1000);
	}
}

Devo.Game.Effects.useEP = function(card, cost) {
	var ep_elm = card.down('.ep');
	var ep = parseInt(ep_elm.innerHTML);
	card.dataset.ep = cost.to;
	if (ep != cost.to) {
		ep_elm.update(ep+'<div class="negative fadeOutUp diff animated">'+cost.diff+'</div>');
		window.setTimeout(function() {
			ep_elm.update(cost.to);
			if ($(card).hasClassName('player')) {
				Devo.Game.updateCardAttackAvailability(card);
			}
		}, 1000);
	}
}

Devo.Game.Effects.getEP = function(card, cost) {
	var ep_elm = card.down('.ep');
	var ep = parseInt(ep_elm.innerHTML);
	card.dataset.ep = cost.to;
	if (ep != cost.to) {
		card.addClassName('restore_properties restore_ep');
		ep_elm.update(ep+'<div class="fadeDownIn diff animated">'+cost.diff+'</div>');
		window.setTimeout(function() {
			ep_elm.update(cost.to);
			card.removeClassName('restore_properties restore_ep');
			Devo.Game.updateCardAttackAvailability(card);
		}, 1000);
	}
}

Devo.Game.Effects.getHP = function(card, cost) {
	var hp_elm = card.down('.hp');
	var hp = parseInt(hp_elm.innerHTML);
	card.dataset.hp = cost.to;
	if (hp != cost.to) {
		card.addClassName('restore_properties restore_health');
		hp_elm.update(hp+'<div class="fadeDownIn diff animated">'+cost.diff+'</div>');
		window.setTimeout(function() {
			card.removeClassName('restore_properties restore_health');
			hp_elm.update(cost.to);
		}, 1000);
	}
}

Devo.Game.Effects.damage = function(card, cost) {
	if (card) {
		var hp_elm = card.down('.hp');
		var hp = parseInt(hp_elm.innerHTML);
		card.dataset.hp = cost.to;
		if (hp != cost.to) {
			hp_elm.update(cost.from+'<div class="negative fadeOutUp diff animated">'+cost.diff+'</div>');
			window.setTimeout(function() {
				hp_elm.update(cost.to);
			}, 1000);
		}
	}
}

Devo.Game.updateCardAttackAvailability = function(card) {
	if (!card.hasClassName('player')) return;
	if (!card.hasClassName('creature')) return;
	var ep = parseInt(card.dataset.ep);
	var gold = Devo.Game.getGoldAmount();
	card.down('.attacks').childElements().each(function(attack) {
		if (parseInt(attack.dataset.costEp) > ep || parseInt(attack.dataset.costGold) > gold) {
			$(attack).addClassName('disabled');
			$(attack).stopObserving('click', Devo.Game.initiateAttack);
		} else if ($(attack).hasClassName('disabled')) {
			$(attack).removeClassName('disabled');
			$(attack).observe('click', Devo.Game.initiateAttack);
		}
	});
};

Devo.Game.getGoldAmount = function() {
	return parseInt($('game-gold').dataset.amount);
};

Devo.Game.getUserId = function() {
	return Devo.options.user_id;
}

Devo.Game.processGameEvents = function(events, persist) {
	events.each(function(event) {
		if (persist == undefined || persist == true) {
			Devo.Game._latest_event_id = event.id;
		}
		Devo.Game.Events.push(event);
	});
};

Devo.Game.processCardRemoved = function(data) {
	var card = $('card_' + data.card_id);
	if (card) {
		var is_placed = (card.hasClassName('placed') || !card.hasClassName('player'));
		var fadeclass = (card.hasClassName('player')) ? 'fadeOutDown' : 'fadeOutUp';
		var initial_timeout = (card.hasClassName('placed')) ? 1000 : 1;

		if (!is_placed) {
			var player_potions = $('player_potions');
			if (!player_potions.hasClassName('visible')) player_potions.addClassName('visible');
		} else {
			var slot = Devo.Game.getCardSlot(card);
			$(slot).removeClassName('targetted');
			$(slot).stopObserving('click', Devo.Game.performAttack);
			slot.dataset.cardId = 0;
		}
		if (is_placed) card.addClassName('animated flip');
		window.setTimeout(function() {
			card.removeClassName('flip');
			card.addClassName(fadeclass);
			window.setTimeout(function() {
				if (!is_placed) {
					player_potions.removeClassName('visible');
					if (card.up().childElements().size() == 2) $('player_no_potions').show();
				}
				card.removeClassName(fadeclass);
				card.remove();
				Devo.Core.Pollers.Locks.eventplaybackpoller = false;
			}, 1000);
		}, initial_timeout);
	} else {
		Devo.Core.Pollers.Locks.eventplaybackpoller = false;
	}
};

Devo.Game.processDamage = function(data) {
	var play_area = $('play-area');
	var card = $('card_' + data.attacking_card_id);
	var attacked_card = $('card_' + data.attacked_card_id);
	var initial_timeout = (data.damage_type == 'repeat' && data.damage_type != 'effect') ? 1 : 1500;
	var is_in_play_area = (play_area.select('#'+data.attacked_card_id).size() > 0);

	if (!is_in_play_area && play_area.select('.card.player').size() > 0) {
		var cards_to_remove = play_area.select('.card.player');
		var card_to_return = cards_to_remove[0];
		if (card_to_return.id != card.id) {
			Devo.Game._returnCardFromPlayArea(card_to_return);
		}
	}
	if (!is_in_play_area && Devo.Game.is_attack == true) {
		Devo.Game._addCardToPlayArea(attacked_card);
	}
	if (data.damage_type != 'repeat' && data.damage_type != 'effect') {
		card.addClassName('animated flash');
		if (data.bonus_cards) {
			data.bonus_cards.each(function(bc) {
				$('card_' + bc).addClassName('bonus_active bonus_attack');
			});
		}
	}
	window.setTimeout(function() {
		if (data.damage_type != 'repeat' && data.damage_type != 'effect') {
			card.removeClassName('animated flash');
			if (data.bonus_cards) {
				data.bonus_cards.each(function(bc) {
					$('card_' + bc).removeClassName('bonus_active bonus_attack');
				});
			}
		}
		attacked_card.addClassName('animated flash');
		if (data.defence_bonus_cards) {
			data.defence_bonus_cards.each(function(dbc) {
				$('card_' + dbc).addClassName('bonus_active bonus_defence');
			});
		}
		window.setTimeout(function() {
			attacked_card.removeClassName('animated flash');
			if (data.defence_bonus_cards) {
				data.defence_bonus_cards.each(function(dbc) {
					$('card_' + dbc).removeClassName('bonus_active bonus_defence');
				});
			}
			Devo.Game.Effects.damage(attacked_card, data.hp);
			window.setTimeout(function() {
				if (Devo.Game.is_attack != true) {
					Devo.Game._returnCardFromPlayArea(attacked_card);
				}
				Devo.Core.Pollers.Locks.eventplaybackpoller = false;
			}, initial_timeout);
		}, 1000);
	}, initial_timeout);
};

Devo.Game.processRestoreHealth = function(data) {
	var card = $('card_' + data.attacking_card_id);
	var attacked_card = $('card_' + data.attacked_card_id);
	if (card && data.player_id == Devo.Game.getUserId()) {
		card.addClassName('animated bounce');
	}

	window.setTimeout(function() {
		if (card && data.player_id == Devo.Game.getUserId()) {
			card.removeClassName('animated bounce');
		}
		attacked_card.addClassName('animated flash');
		window.setTimeout(function() {
			attacked_card.removeClassName('animated flash');
			Devo.Game.Effects.getHP(attacked_card, data.hp);
			window.setTimeout(function() {
				Devo.Core.Pollers.Locks.eventplaybackpoller = false;
			}, 1000);
		}, 1000);
	}, 1000);
};

Devo.Game.processRestoreEnergy = function(data) {
	var card = $('card_' + data.attacking_card_id);
	var attacked_card = $('card_' + data.attacked_card_id);
	if (data.player_id == Devo.Game.getUserId()) {
		card.addClassName('animated bounce');
	}

	window.setTimeout(function() {
		if (data.player_id == Devo.Game.getUserId()) {
			card.removeClassName('animated bounce');
		}
		attacked_card.addClassName('animated flash');
		window.setTimeout(function() {
			attacked_card.removeClassName('animated flash');
			Devo.Game.Effects.getEP(attacked_card, data.ep);
			window.setTimeout(function() {
				Devo.Core.Pollers.Locks.eventplaybackpoller = false;
			}, 1000);
		}, 1000);
	}, 1000);
};

Devo.Game.processApplyEffect = function(data) {
	if ($('card_' + data.attacked_card_id)) {
		$('card_' + data.attacked_card_id).addClassName('effect-'+data.effect);
	}
	Devo.Core.Pollers.Locks.eventplaybackpoller = false;
};

Devo.Game.processUserOffline = function(data) {
	$('player-'+data.changed_player_id+'-name').addClassName('offline');
	Devo.Core.Pollers.Locks.eventplaybackpoller = false;
};

Devo.Game.processUserOnline = function(data) {
	$('player-'+data.changed_player_id+'-name').removeClassName('offline');
	Devo.Core.Pollers.Locks.eventplaybackpoller = false;
};

Devo.Game.processThinking = function(data) {
	window.setTimeout(function() {
		Devo.Core.Pollers.Locks.eventplaybackpoller = false;
	}, parseInt(data.duration));
};

Devo.Game.processRemoveEffect = function(data) {
	var card = $('card_' + data.attacked_card_id);
	if (card) {
		var is_stunned = card.hasClassName('effect-stun');
		card.removeClassName('effect-'+data.effect);
		if (is_stunned && card.hasClassName('player') && !card.hasClassName('effect-stun')) {
			Devo.Game._initializeCardActions(card);
		}
	}
	Devo.Core.Pollers.Locks.eventplaybackpoller = false;
};

Devo.Game.processStealGold = function(data) {
	if (data.player_id != Devo.Game.getUserId()) {
		Devo.Game.Effects.stolenGold(data.amount);
	} else {
		Devo.Game.Effects.getGold(data.amount);
	}
	window.setTimeout(function() {
		Devo.Core.Pollers.Locks.eventplaybackpoller = false;
	}, 1000);
};

Devo.Game.processGenerateGold = function(data) {
	if (data.player_id == Devo.Game.getUserId()) {
		Devo.Game.Effects.getGold(data.amount);
	}
	window.setTimeout(function() {
		Devo.Core.Pollers.Locks.eventplaybackpoller = false;
	}, 1000);
};

Devo.Game.processStealEP = function(data) {
	var card = $('card_' + data.attacking_card_id);
	var attacked_card = $('card_' + data.attacked_card_id);

	card.addClassName('animated bounce');
	window.setTimeout(function() {
		card.removeClassName('animated bounce');
		attacked_card.addClassName('animated flash');
		window.setTimeout(function() {
			attacked_card.removeClassName('animated flash');
			Devo.Game.Effects.useEP(attacked_card, data.amount);
			window.setTimeout(function() {
				Devo.Core.Pollers.Locks.eventplaybackpoller = false;
			}, 1000);
		}, 1000);
	}, 1000);
};

Devo.Game.processAttack = function(data) {
	Devo.Game.is_attack = true;
	$('opponent-slots-container').addClassName('battling');
	$('player-slots-container').addClassName('battling');
	var card = $('card_' + data.attacking_card_id);
	Devo.Game._addCardToPlayArea(card);
	
	if (data.player_id == Devo.Game.getUserId()) {
		Devo.Game._actions_remaining = data.remaining_actions;
		$('phase-3-actions-remaining').update(data.remaining_actions);
		if (Devo.Game._actions_remaining == 0) {
			Devo.Game._uninitializeActions();
		}
		if (data.cost && data.cost.gold) Devo.Game.Effects.useGold(data.cost.gold);
	}
	if (data.cost && data.cost.ep) Devo.Game.Effects.useEP(card, data.cost.ep);
	if (data.cost && data.cost.hp) Devo.Game.Effects.damage(card, data.cost.hp);
	Devo.Core.Pollers.Locks.eventplaybackpoller = false;
}

Devo.Game._addCardToPlayArea = function(card) {
	var card_slot = Devo.Game.getCardSlot(card);
	var play_area = $('play-area');
	
	var c = card.remove();
	c.removeClassName('medium');
	play_area.insert(c);
	
	card_slot.select('.item-slot').each(function(p_slot) {
		if (p_slot.dataset.cardId && $('card_'+p_slot.dataset.cardId)) {
			play_area.insert($('card_'+p_slot.dataset.cardId).remove());
		}
	});
}

Devo.Game.getCardSlot = function(card) {
	return (card.hasClassName('player')) ? $('player-slot-'+card.dataset.slotNo) : $('opponent-slot-'+card.dataset.slotNo);
};

Devo.Game._returnCardFromPlayArea = function(card) {
	var card_slot = Devo.Game.getCardSlot(card);
	var c = card.remove();
	c.addClassName('medium');
	card_slot.insert({top: c});

	card_slot.select('.item-slot').each(function(p_slot) {
		if (p_slot.dataset.cardId && $('card_'+p_slot.dataset.cardId)) {
			p_slot.insert($('card_'+p_slot.dataset.cardId).remove());
		}
	});
}

Devo.Game.processEndAttack = function(data) {
	Devo.Game.is_attack = false;
	$('opponent-slots-container').removeClassName('battling');
	$('player-slots-container').removeClassName('battling');
	$('play-area').select('.card.creature').each(function(card) {
		Devo.Game._returnCardFromPlayArea(card);
	});
	Devo.Core.Pollers.Locks.eventplaybackpoller = false;
}

Devo.Game.processReplenish = function(data) {
	data.card_updates.each(function(card) {
		var c = $('card_'+card.card_id);
		if (c) {
			if (card.hp) {
				if (card.hp.to < card.hp.from) Devo.Game.Effects.damage(c, card.hp);
				if (card.hp.to > card.hp.from) Devo.Game.Effects.getHP(c, card.hp);
			}
			if (card.ep) {
				if (card.ep.to < card.ep.from) Devo.Game.Effects.useEP(c, card.ep);
				if (card.ep.to > card.ep.from) Devo.Game.Effects.getEP(c, card.ep);
			}
		}
	});
	if (data.player_id == Devo.Game.getUserId()) {
		var classname = (data.gold.diff < 0) ? 'negative fadeOutUp' : 'positive fadeInDown';
		$('game-gold-amount').update(data.gold.from+'<div class="'+classname+' diff animated">'+data.gold.diff+'</div>');
		window.setTimeout(function() {
			$('game-gold-amount').update(data.gold.to);
			$('game-gold').dataset.amount = data.gold.to;
			$$('.card.player').each(function(c) {
				Devo.Game.updateCardAttackAvailability(c);
			});
			Devo.Core.Pollers.Locks.eventplaybackpoller = false;
		}, 1000);
	} else {
		Devo.Core.Pollers.Locks.eventplaybackpoller = false;
	}
};

Devo.Game.processGameOver = function(data) {
	$('gameover-overlay').setStyle({opacity: 0});
	$('gameover-overlay').show();
	$('gameover-overlay').select('.winning').each(function(element) {
		$(element).hide();
	});
	window.setTimeout(function() {
		$('gameover-overlay').addClassName('animated fadeIn');
		$('winning_player_' + data.winning_player_id).show();
		window.setTimeout(function() {
			$('winning_player_' + data.winning_player_id).addClassName('animated tada');
			Devo.Game.getStatistics();
		}, 1000);
	}, 100);
	Devo.Core.Pollers.gamedatapoller = null;
};

Devo.Game.processResolve = function(data) {
	$$('.card.flipped').each(function(card) {
		$(card).addClassName('animated flipOutY');
		window.setTimeout(function() {
			$(card).removeClassName('flipped');
			$(card).removeClassName('flipOutY');
			$(card).addClassName('flipInY');
			window.setTimeout(function() {
				$(card).removeClassName('flipInY');
				$(card).removeClassName('animated');
			}, 1000);
		}, 1000);
	});
};

Devo.Game.processPlayerChange = function(data) {
	Devo.Game._current_turn = data.current_turn;
	if (data.current_turn > 2) {
		if (data.current_turn == 3) {
			$('place_cards').addClassName('fadeOut');
			$('end-phase-2-button').down('.place-cards-content').hide();
			$('end-phase-2-button').down('.end-phase-content').show();
			window.setTimeout(function() {
				$('place_cards').hide();
				$('end-phase-2-button').hide();
			}, 1000);
			if (data.player_id != Devo.Game.getUserId()) {
				$('end-phase-4-button').addClassName('disabled');
				$('end-phase-4-button').show();
			}
		}
		var initial_timeout = (data.current_turn == 3) ? 2000 : 1000;
		$$('.avatar').each(function(avatar) {
			$(avatar).removeClassName('current-turn');
		});
		$('turn-info').childElements().each(function(element) {
			if (element.id == 'player-'+data.player_id+'-turn') {
				// Make the element "visible", but invisible
				window.setTimeout(function() {
					$(element).setStyle({opacity: 0});
					$(element).show();

					// Make the element fade in after a very tiny delay
					window.setTimeout(function() {
						$('avatar-player-'+data.player_id).addClassName('current-turn');
						$(element).addClassName('fadeIn');

						// Remove fade in effect after it is done (1.5s) and make it permanently visible
						window.setTimeout(function() {
							$(element).removeClassName('fadeIn');
							$(element).addClassName('tada');
							$(element).setStyle({opacity: 1});

							// Remove fade in effect after it is done (1.5s) and make it permanently visible
							window.setTimeout(function() {
								$(element).removeClassName('tada');
								if (data.player_id == Devo.Game.getUserId()) {
									Devo.Game.enableTurn();
								} else {
									Devo.Game.disableTurn();
								}
							}, 1000);
						}, 1000);
					}, 1000);
				}, initial_timeout);
			} else if (element.id != 'place_cards' && data.current_turn > 3) {
				// Make the element fade out
				$(element).addClassName('fadeOut');

				// Remove the fadeout effect and hide the element after the fadeout effect animation is complete (1.5s)
				window.setTimeout(function() {
					$(element).hide();
					$(element).removeClassName('fadeOut');
				}, 1000);
			}
		});
	} else {
		if (data.player_id == Devo.Game.getUserId()) {
			Devo.Game.enableTurn();
		} else {
			Devo.Game.disableTurn();
		}
	}
};

Devo.Game.processCardMovedOntoSlot = function(data) {
	if (data.current_turn <= 2) {
		Devo.Core.Pollers.Locks.eventplaybackpoller = false;
	}
	var card = $('card_'+data.card_id);
	var slot_no = data.slot;
	var id = (data.player_id == Devo.Game.getUserId()) ? 'player-slot-'+slot_no : 'opponent-slot-'+slot_no;
	if (data['is-item-1']) id += '-item-slot-1';
	if (data['is-item-2']) id += '-item-slot-2';
	var slot = $(id);
	if (card) {
		if ((card).dataset.slotNo != slot_no) {
			card.hide();
			card.setStyle({opacity: 0});
			card = card.remove();
			slot.insert({top: card});
			Devo.Game.Effects.cardAppear(card);
		} else {
			Devo.Core.Pollers.Locks.eventplaybackpoller = false;
		}
	} else if(slot_no > 0) {
		Devo.Game.getCard(data.card_id, function(json) {
			slot.insert({top: json.card});
			card = $('card_'+data.card_id);
			card.setStyle({opacity: 0});
			if (data.turn_number <= 2) card.removeClassName('flipped');
			Devo.Game.updateCardAttackAvailability(card);
			Devo.Game.Effects.cardAppear(card);
		});
	}
};

Devo.Game.processCardMovedOffSlot = function(data) {
	var card = $('card_'+data.card_id);
	var slot_no = data.slot;
	if (card) {
		if ((card).dataset.slotNo == slot_no) {
			Devo.Game.Effects.cardFade(card);
		} else {
			Devo.Core.Pollers.Locks.eventplaybackpoller = false;
		}
	}
};

Devo.Game.getCards = function() {
	Devo.Main.Helpers.ajax(Devo.options['ask_url'], {
		additional_params: '&game_id='+Devo.Game._id+'&for=get_cards',
		success: {
			callback: function(json) {
				if (json.game.events.size() > 0) {
					json.game.events.each(function(event) {
						Devo.Game.Events.push(event);
					});
				}
			}
		}
	});
}

Devo.Game.processPhaseChange = function(data, event_id) {
	Devo.Game._current_turn = data.current_turn;
	Devo.Game._initialized_phase_change = false;
	if (data.new_phase == 4 && Devo.Game._current_turn == 2) {
		Devo.Game.getCards();
	}
	if (data.player_id == Devo.Game.getUserId() && Devo.Game._current_turn > 2) {
//		if (data.new_phase == 2 && Devo.Game._current_turn <= 2 && Devo.Game._movable == false) {
//			$('end-phase-2-button').removeClassName('disabled');
//			Devo.Game.endPhase($('end-phase-2-button'));
//			Devo.Core.Pollers.Locks.eventplaybackpoller = false;
//			return;
//		}
		var new_phase_button = $('end-phase-'+data.new_phase+'-button');
		if (data.old_phase != 4) {
			var old_phase_button = $('end-phase-'+data.old_phase+'-button');
			old_phase_button.addClassName('animated fadeOut');
			if (data.old_phase == 3) {
				$('phase-3-actions').addClassName('animated fadeOut');
			}
		}
		window.setTimeout(function() {
			if (data.old_phase != 4) {
				$(old_phase_button).down('img').hide();
				old_phase_button.hide();
				if (data.old_phase == 3) {
					$('phase-3-actions').hide();
				}
				if (data.current_turn > 2) {
					new_phase_button.setStyle({opacity: 0});
					new_phase_button.removeClassName('disabled');
					new_phase_button.down('img').hide();
					new_phase_button.show();
					if (data.new_phase == 3) {
						$('phase-3-actions').setStyle({opacity: 0});
						$('phase-3-actions').show();
					}
				}
			}
			window.setTimeout(function() {
				if (data.old_phase != 4) {
					old_phase_button.removeClassName('animated fadeOut');
					new_phase_button.addClassName('animated fadeIn');
					if (data.current_turn > 2 || data.new_phase == 2) {
						if (data.new_phase == 3) {
							$('phase-3-actions').removeClassName('animated fadeOut');
							$('phase-3-actions').addClassName('animated fadeIn');
						}
						window.setTimeout(function() {
							new_phase_button.removeClassName('animated fadeIn');
							new_phase_button.writeAttribute('style', '');
							if (data.new_phase == 3) {
								$('phase-3-actions').removeClassName('animated fadeIn');
								$('phase-3-actions').writeAttribute('style', '');
							}
						}, 1000);
					}
					switch (data.new_phase) {
						case 2:
							if (data.current_turn > 2) {
								Devo.Game._uninitializeActions();
								window.setTimeout(function() {
									Devo.Game._movable = true;
									Devo.Game._initializeDragDrop();
									Devo.Core.Pollers.Locks.eventplaybackpoller = false;
								}, 1000);
							} else {
								Devo.Game._movable = true;
								Devo.Game._initializeDragDrop();
								Devo.Core.Pollers.Locks.eventplaybackpoller = false;
							}
							break;
						case 3:
							Devo.Game._movable = false;
							if (data.current_turn > 2) {
								Devo.Game._actions = true;
								Devo.Game._actions_remaining = 2;
								$('phase-3-actions-remaining').update(2);
							}
							Devo.Game._uninitializeDragDrop();
							if (data.current_turn > 2) Devo.Game._initializeActions();
							Devo.Core.Pollers.Locks.eventplaybackpoller = false;
							break;
						case 4:
							Devo.Game._actions = false;
							$('phase-3-actions-remaining').update(0);
							Devo.Game._actions_remaining = 0;
							if (data.current_turn > 2) Devo.Game._uninitializeActions();
							Devo.Core.Pollers.Locks.eventplaybackpoller = false;
							break;
						default:
							Devo.Core.Pollers.Locks.eventplaybackpoller = false;
					}
				} else {
					Devo.Core.Pollers.Locks.eventplaybackpoller = false;
				}
			}, 100);
		}, 1000);
	} else {
		if (data.new_phase == 4) {
			Devo.Game.processResolve(data);
		}
		Devo.Core.Pollers.Locks.eventplaybackpoller = false;
	}
};

Devo.Game.enableTurn = function() {
	var p4_button = $('end-phase-4-button');
	p4_button.addClassName('animated fadeOut');
	if (Devo.Game._current_turn > 2) {
		var p1_button = $('end-phase-1-button');
	}
	window.setTimeout(function() {
		p4_button.hide();
		p4_button.removeClassName('animated fadeOut');
		if (Devo.Game._current_turn > 2) {
			$(p1_button).down('img').hide();
			p1_button.removeClassName('disabled');
			p1_button.show();
			window.setTimeout(function() {
				$$('#player-slots .card').each(function(card) {
					if (!$(card).hasClassName('placed')) $(card).addClassName('placed');
				});
				Devo.Core.Pollers.Locks.eventplaybackpoller = false;
			}, 1000);
		} else {
			Devo.Core.Pollers.Locks.eventplaybackpoller = false;
		}
	}, 1000);
};

Devo.Game.disableTurn = function() {
	var button = $('end-phase-4-button');
	button.addClassName('disabled');
	$(button).down('img').hide();
	Devo.Game.clearCountdown();
	Devo.Core.Pollers.Locks.eventplaybackpoller = false;
};

Devo.Game._calculateDropSlots = function(card) {
	$('player-slots').addClassName('droptargets');
	if (card.up('#player_hand')) {
		$('player_stuff').addClassName('dragging');
	} else {
		if (card.hasClassName('creature')) {
			if (!card.hasClassName('placed')) {
				$('player_stuff').addClassName('droptarget');
				$('player_stuff').removeClassName('fadeOut');
			}
		} else {
			$('player_stuff').addClassName('droptarget');
			$('player_stuff').removeClassName('fadeOut');
		}
	}
};

Devo.Game.card_dragstart = function(e) {
	Devo.Game.dropped = undefined;
	Devo.Game.dragged = this.id;
	this.classList.add('dragging');
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/plain', this.id);
	Devo.Game._calculateDropSlots($(this));
	return false;
};

Devo.Game.card_dragover = function(e) { 
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.dataTransfer.dropEffect = 'move';
	return false;
};

Devo.Game.card_dragend = function(e) {
	e.preventDefault();
	$('player_stuff').removeClassName('dragging');
	$('player_stuff').removeClassName('droptarget');
	$('player-slots').removeClassName('droptargets');
	this.classList.remove('dragging');
	this.classList.remove('medium');
	if (Devo.Game.dropped) {
		var pthis = $(this);
		var orig_pos = this.dataset.originalPosition;
		if (!orig_pos) {
			this.dataset.originalPosition = pthis.up().id;
		} else {
			$(orig_pos).dataset.cardId = 0;
		}
		var prev_slot = pthis.up();
		prev_slot.dataset.cardId = 0;
		var dropped = $(Devo.Game.dropped);
		var e_card = dropped.down('.card.equippable_item');
		if (e_card) {
			if (this.dataset.slotNo) {
				e_card.dataset.slotNo = this.dataset.slotNo;
			} else {
				e_card.dataset.slotNo = 0;
			}
			prev_slot.dataset.cardId = e_card.dataset.cardId;
			var o_card = e_card.remove();
		}
		var card = pthis.remove();
		if (o_card) {
			if (prev_slot.id == 'player_hand') {
				prev_slot.insert({bottom: o_card});
				o_card.removeClassName('medium');
			} else {
				prev_slot.insert({top: o_card});
			}
		}
		dropped.insert({top: card});
		this.dataset.slotNo = dropped.dataset.slotNo;
		if (Devo.Game.dropped != 'player_hand') {
			if (!pthis.hasClassName('medium')) {
				pthis.addClassName('medium');
			}
			if (pthis.hasClassName('item')) {
				var parent_slot = dropped.up('.card-slot');
				parent_slot.removeClassName('drop-denied');
				parent_slot.removeClassName('drop-hover');
				if (!pthis.hasClassName('placed')) pthis.addClassName('placed');
			}
			dropped.dataset.cardId = this.dataset.cardId;
			if ($('player_hand').childElements().size() == 0) {
				$('player_stuff').removeClassName('visible');
			}
		}
		if (Devo.Game.dropped == 'player_hand' && pthis.hasClassName('medium')) pthis.removeClassName('medium');
	}
};

Devo.Game.cardslot_dragover = function(e) {
	e.dataTransfer.dropEffect = 'move';
	var card_id = Devo.Game.dragged;
	var slot = $(this);
	var card = $(card_id);
	var hovered = false;
	if (card.hasClassName('creature') && slot.hasClassName('creature-slot')) {
		if (this.id == 'player_stuff') {
			if (card.hasClassName('placed')) {
				slot.addClassName('denied');
				hovered = true;
			} else {
				hovered = true;
				slot.addClassName('peek');
				e.preventDefault();
			}
		} else if (slot.hasClassName('player') && !slot.down('.card')) {
			hovered = true;
			slot.addClassName('drop-hover');
			e.preventDefault();
		}
	} else if (card.hasClassName('item') && slot.hasClassName('creature-slot')) {
		hovered = true;
	} else if (card.hasClassName('item') && slot.hasClassName('item-slot')) {
		if (this.id == 'player_stuff') {
			hovered = true;
			slot.addClassName('peek');
			e.preventDefault();
		} else {
			var parent_slot = slot.up('.card-slot');
			var slot_card = parent_slot.down('.card.creature');
			if (slot_card) {
				if ((slot_card.hasClassName('class-civilian') && card.dataset.equippableByCivilian == 'true') ||
				(slot_card.hasClassName('class-magic') && card.dataset.equippableByMagic == 'true') ||
				(slot_card.hasClassName('class-military') && card.dataset.equippableByMilitary == 'true') ||
				(slot_card.hasClassName('class-physical') && card.dataset.equippableByPhysical == 'true') ||
				(slot_card.hasClassName('class-ranged') && card.dataset.equippableByRanged == 'true')) {
					hovered = true;
					slot.addClassName('drop-hover');
					parent_slot.removeClassName('drop-denied');
					e.preventDefault();
				}
			}
		}
	}
	if (hovered == false) {
		slot.addClassName('drop-denied');
	}
};

Devo.Game.cardslot_dragleave = function(e) {
	this.classList.remove('drop-hover');
	this.classList.remove('drop-denied');
	this.classList.remove('peek');
	this.classList.remove('denied');
};

Devo.Game.cardslot_drop = function(e) {
	e.stopPropagation();
	e.preventDefault();
	this.classList.remove('drop-denied');
	this.classList.remove('peek');
	if (!$(this).hasClassName('drop-hover') && !$(this).hasClassName('droptarget')) {
		return;
	}
	this.classList.remove('drop-hover');
	Devo.Game.dropped = (this.id == 'player_stuff') ? 'player_hand' : this.id;
};

Devo.Game.toggleActionCard = function(event) {
	if (this.up('.card-slot').hasClassName('targetted') || this.hasClassName('effect-stun')) return;
	if (!this.hasClassName('selected')) {
		$('player-slots').select('.card').each(function(card) {
			if (!$(card).hasClassName('medium') && card.id != this.id) {
				$(card).removeClassName('selected');
				$(card).addClassName('medium');
			}
		});
		this.addClassName('selected');
		this.removeClassName('medium');
	} else {
		this.addClassName('medium');
		this.removeClassName('selected');
	}
}

Devo.Game.checkAttackAvailability = function(card, attack) {
	if (card.hasClassName('creature')) {
		return (card.hasClassName('placed') && Devo.Game.getGoldAmount() >= parseInt(attack.dataset.costGold) && parseInt(card.dataset.ep) >= parseInt(attack.dataset.costEp)) ? true : false;
	} else {
		return attack.hasClassName('potion');
	}
}

Devo.Game.enableEndActionsTimer = function() {
	if (!$('game-countdown').visible()) {
		$('game-countdown').removeClassName('enabled');
		$('game-countdown').show();
		window.setTimeout(function() {
			$('game-countdown').addClassName('enabled');
			$('game-countdown').dataset.timeoutId = window.setTimeout(function() {
				if ($('end-phase-3-button').visible()) {
					Devo.Game.endPhase($('end-phase-3-button'));
				}
			}, 5000);
		}, 100);
	}
};

Devo.Game.performAttack = function(event) {
	var attacked_card = this.down('.card.creature');
	var attack = $(Devo.Game._currentattack);
	var card = $(attack).up('.card');
	if (Devo.Game.checkAttackAvailability(card, attack)) {
		event.stopPropagation();
		Devo.Game.unhighlightTargets();
		if (card.hasClassName('creature')) {
			Devo.Game.Effects.useGold({from: Devo.Game.getGoldAmount(), diff: parseInt(attack.dataset.costGold), to: Devo.Game.getGoldAmount() - parseInt(attack.dataset.costGold)});
			Devo.Game.Effects.useEP(card, {from: parseInt(card.dataset.ep), diff: parseInt(attack.dataset.costEp), to: parseInt(card.dataset.ep) - parseInt(attack.dataset.costEp)});
		} else if (card.hasClassName('potion_item')) {
			$('player_potions').removeClassName('active');
		}
		var extraparams = (card.hasClassName('creature')) ? '&topic=attack&attack_id='+attack.dataset.attackId : '&topic=potion&card_id='+card.dataset.cardId;

		if (card.hasClassName('creature')) {
			Devo.Game._actions_remaining--;
			$('phase-3-actions-remaining').update(Devo.Game._actions_remaining);
			if (Devo.Game._actions_remaining == 0) {
				Devo.Game._uninitializeActions();
				Devo.Game.enableEndActionsTimer();
			}
		}

		Devo.Main.Helpers.ajax(Devo.options['say_url'], {
			additional_params: '&game_id='+Devo.Game._id+extraparams+'&attacked_card_id='+attacked_card.dataset.cardId,
			failure: {
				callback: function(json) {
					Devo.Game.Effects.getGold({from: Devo.Game.getGoldAmount(), diff: parseInt(attack.dataset.costGold), to: Devo.Game.getGoldAmount() + parseInt(attack.dataset.costGold)});
					Devo.Game.Effects.getEP(card, {from: parseInt(card.dataset.ep), diff: parseInt(attack.dataset.costEp), to: parseInt(card.dataset.ep) + parseInt(attack.dataset.costEp)});
				}
			}
		});
	} else {
		Devo.Game.updateCardAttackAvailability(card);
	}
};

Devo.Game.highlightTargets = function(attack) {
	if ($('end-phase-3-button').visible()) $('end-phase-3-button').addClassName('disabled');
	attack.addClassName('attacking');
	if (attack.hasClassName('potion')) $('player_potions').addClassName('active');
	var selector = '';
	if (attack.hasClassName('potion')) {
		selector = '#player-slots';
	} else {
		selector = '#opponent-slots';
		if (attack.dataset.isBonusAttack || attack.dataset.doesAttackAll) selector += ', #player-slots';
	}
	
	$$(selector).each(function(sel) {
		$(sel).select('.card-slot.creature-slot').each(function(slot) {
			if (slot.down('.card')) {
				$(slot).addClassName('targetted');
				$(slot).observe('click', Devo.Game.performAttack);
			}
		});
	});
};

Devo.Game.unhighlightTargets = function() {
	if (Devo.Game._currentattack) {
		$('end-phase-3-button').removeClassName('disabled');
		$$('.card-slot').each(function(slot) {
			$(slot).removeClassName('targetted');
			$(slot).stopObserving('click', Devo.Game.performAttack);
		});
		$$('.card.player').each(function(card) {
			$(card).select('.attack').each(function(a) {
				$(a).removeClassName('temp_disabled');
			});
		});
		$(Devo.Game._currentattack).removeClassName('attacking');
		if ($(Devo.Game._currentattack).hasClassName('potion')) $('player_potions').removeClassName('active');
		Devo.Game._currentattack = null;
	}
};

Devo.Game._escapeWatcher = function(event) {
	if (Event.KEY_ESC != event.keyCode) return;
	Devo.Game.unhighlightTargets();
};

Devo.Game.initiateAttack = function(event) {
	if (Devo.Game._currentattack && Devo.Game._currentattack == this.id) {
		Devo.Game.unhighlightTargets();
		event.stopPropagation();
	} else if (!this.hasClassName('temp_disabled')) {
		event.stopPropagation();
		Devo.Game._currentattack = this.id;
		Devo.Game.highlightTargets(this);
		$$('.card.player').each(function(card) {
			$(card).select('.attack').each(function(a) {
				if (a.id != Devo.Game._currentattack) {
					$(a).addClassName('temp_disabled');
				}
			});
		});
	}
}

Devo.Core._blinkTitle = function() {
	document.title = Devo.Core._isOldTitle ? Devo.options.title : Devo.options.alternate_title;
	Devo.Core._isOldTitle = !Devo.Core._isOldTitle;
};

Devo.Core._stopBlinkTitle = function() {
	Devo.Core._infocus = true;
	clearInterval(Devo.Core._titleBlinkInterval);
	document.title = Devo.options.title;
};

Devo.Game._initializeMusic = function() {
    var myAudio = document.createElement('audio'); 
    
    if (myAudio.canPlayType) {
       var canPlayMp3 = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/mpeg');
       var canPlayOgg = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/ogg; codecs="vorbis"');
    }
	Devo.Game._music = new Audio("/sounds/bgm." + ((canPlayMp3) ? 'mp3' : 'ogg'));
	Devo.Game._music.volume = 0.1;
	Devo.Game._music.loop = true;
	Devo.Game._music.play();
};

Devo.Game._uninitializeMusic = function() {
	if (Devo.Game._music && Devo.Game._music.play) {
		Devo.Game._music.pause();
	}
	Devo.Game._music = null;
}

Devo.Core.detectFullScreenSupport = function() {
	var docElm = document.documentElement;
	if (docElm.requestFullscreen) return true;
	if (docElm.mozRequestFullScreen) return true;
	if (docElm.webkitRequestFullScreen) return true;
	
	return false;
}

Devo.Core.toggleFullscreen = function() {
	var docElm = document.documentElement;
	if (docElm.requestFullscreen) {
		(document.fullScreen) ? document.cancelFullscreen() : docElm.requestFullscreen();
	}
	else if (docElm.mozRequestFullScreen) {
		(document.mozFullScreen) ? document.mozCancelFullScreen() : docElm.mozRequestFullScreen();
	}
	else if (docElm.webkitRequestFullScreen) {
		(document.webkitIsFullScreen) ? document.webkitCancelFullScreen() : docElm.webkitRequestFullScreen();
	}
};

Devo.Game.initialize = function(options) {
	$('fullpage_backdrop').show();
	Devo.Game._id = options.game_id;
	Devo.Game._latest_event_id = options.latest_event_id;
	Devo.Game._current_turn = options.current_turn;
	Devo.Game._current_phase = options.current_phase;
	Devo.Game._current_player_id = options.current_player_id;
	Devo.Game._movable = options.movable;
	Devo.Game._actions = options.actions;
	Devo.Game._actions_remaining = options.actions_remaining;
	Devo.Game._music_enabled = options.music_enabled;
	Devo.Game._initializeGameDataPoller();
	Devo.Game._initializeCards();
	Devo.Core._initializeChatRoomPoller();
	Devo.Game._initialized_phase_change = false;
	if (Devo.Game._music_enabled) {
		Devo.Game._initializeMusic();
	}
	if (Devo.Game._current_player_id == Devo.Game.getUserId() && Devo.Game._current_turn > 2) {
		if (Devo.Game._current_phase == 3 && Devo.Game._actions_remaining == 0) {
			Devo.Game.enableEndActionsTimer();
		} else if (Devo.Game._current_phase == 4) {
			Devo.Game.enableEndTurnTimer();
		}
	}
	document.observe('keydown', Devo.Game._escapeWatcher);
	document.body.addEventListener('touchmove', function(event) {event.preventDefault();}, false);
};

Devo.Game.toggleHand = function() {
	$('player_stuff').toggleClassName('visible');
};

Devo.Game.togglePotions = function() {
	$('player_potions').toggleClassName('visible');
};

Devo.Game.toggleEvents = function() {
	if ($('game_events').hasClassName('visible')) {
		$('game_events').toggleClassName('fadeIn');
		$('game_events').toggleClassName('fadeOut');
		window.setTimeout( function() {
			$('game_events').toggleClassName('visible');
		}, 1000);
	} else {
		$('game_events').toggleClassName('visible');
		window.setTimeout( function() {
			$('game_events').toggleClassName('fadeIn');
			$('game_events').toggleClassName('fadeOut');
		}, 100);
	}
};

Devo.Game.clearCountdown = function() {
	var tid = $('game-countdown').dataset.timeoutId;
	if (tid) {
		window.clearTimeout(tid);
		$('game-countdown').hide();
		$('game-countdown').removeClassName('enabled');
		$('game-countdown').removeClassName('slow');
	}
};

Devo.Game.enableEndTurnTimer = function() {
	$('game-countdown').show();
	window.setTimeout(function() {
		$('game-countdown').addClassName('enabled');
		$('game-countdown').addClassName('slow');
		$('game-countdown').dataset.timeoutId = window.setTimeout(function() {
			if ($('end-phase-4-button').visible()) {
				Devo.Game.endPhase($('end-phase-4-button'));
			}
		}, 10000);
	}, 100);
};

Devo.Game.endPhase = function(button) {
	if (!$(button).hasClassName('disabled')) {
		Devo.Game._initialized_phase_change = true;
		Devo.Game.clearCountdown();
		Devo.Core.Pollers.Locks.gamedatapoller = false;
		var params = '&topic=end_phase&game_id='+Devo.Game._id;
		if (Devo.Game._movable) {
			for (var cc = 1; cc <= 5; cc++) {
				var p = $('player-slot-'+cc);
				var pi1 = $('player-slot-'+cc+'-item-slot-1');
				var pi2 = $('player-slot-'+cc+'-item-slot-2');
				params += '&slots['+cc+'][card_id]='+p.dataset.cardId+'&slots['+cc+'][powerupcard1_id]='+pi1.dataset.cardId+'&slots['+cc+'][powerupcard2_id]='+pi2.dataset.cardId;
			}
			if (Devo.Game._current_turn <= 2) {
				$('end-phase-2-button').down('.place-cards-content').update('Waiting for opponent');
			}
			$('player_stuff').removeClassName('visible');
		} else if (Devo.Game._actions) {
			$('player-slots').select('.card.player').each(function(card) {
				if (!$(card).hasClassName('medium')) $(card).addClassName('medium');
			});
			if (Devo.Game._current_turn > 2) {
				Devo.Game.enableEndTurnTimer();
			}
		}
		Devo.Main.Helpers.ajax(Devo.options['say_url'], {
			additional_params: params,
			loading: {
				callback: function() {
					$(button).down('img').show();
					$(button).addClassName('disabled');
				}
			}
		});
	}
};

Devo.Game.getStatistics = function() {
	Devo.Main.Helpers.ajax(Devo.options['ask_url'], {
		additional_params: '&for=game_stats&game_id='+Devo.Game._id,
		loading: {indicator: 'game_statistics_indicator'},
		success: {
			callback: function(json) {
				$('statistics_hp').update(json.stats.hp);
				$('statistics_cards').update(json.stats.cards);
				$('statistics_gold').update(json.stats.gold);
				$('statistics_xp').update(json.stats.xp);
				$('game_statistics').show();
			}
		}
	});
};

Devo.Main.showCardActions = function(card_id) {
	var card = $('card_'+card_id);
	var cards = $$('.card');
	$$('.card_actions').each(function(element) {$(element).hide();});
	if (card.hasClassName('selected')) {
		card.removeClassName('selected');
		cards.each(function(element) {$(element).removeClassName('faded');});
	} else {
		cards.each(function(element) {$(element).addClassName('faded');$(element).removeClassName('selected');});
		card.removeClassName('faded');
		$('card_'+card_id).addClassName('selected');
		var ca = $('card_'+card_id+'_actions');
		ca.show();
	}
};

Devo.Play.pickCardToggle = function(card_id) {
	var card = $('card_'+card_id);
	if (card.hasClassName('selected')) {
		$('picked_card_' + card_id).setValue(0);
	} else {
		$('picked_card_' + card_id).setValue(1);
	}
	card.toggleClassName('selected');
	var num_cards = $$('.card.selected').size();
	$$('input[type=submit].play-button').each(function(element) {
		(num_cards >= 5) ? $(element).enable() : $(element).disable();
	});
};

Devo.Play.quickmatch = function() {
	$('quickmatch_overlay').show();
	$('quickmatch_overlay').addClassName('loading');
	$('cancel_quickmatch_button').setStyle({opacity: 0});
	window.setTimeout(function() {
		$('cancel_quickmatch_button').addClassName('animated fadeIn');
		window.setTimeout(function() {
			$('cancel_quickmatch_button').setStyle({opacity: 1});
			$('cancel_quickmatch_button').removeClassName('animated fadeIn');
		}, 2000);
	}, 5000);
	Devo.Core._initializeQuickmatchPoller();
}

Devo.Play.invite = function(user_id, button) {
	Devo.Main.Helpers.ajax(Devo.options['say_url'], {
		params: '&topic=invite&user_id='+user_id,
		loading: {
			callback: function() {
				$(button).down('img').show();
			}
		},
		success: {
			callback: function(json) {
				$('my_ongoing_games_none').removeClassName('animated fadeIn');
				$('my_ongoing_games_none').addClassName('animated fadeOut');
				window.setTimeout(function() {$('my_ongoing_games_none').hide();$('my_ongoing_games').insert(json.game);}, 1100);
				window.setTimeout(function() {$('my_ongoing_games').childElements().last().addClassName('animated tada');}, 1200);
				window.setTimeout(function() {$('my_ongoing_games').childElements().last().removeClassName('animated tada');}, 3000);
			}
		},
		complete: {
			callback: function() {
				$(button).down('img').hide();
			}
		}
	});
}

Devo.Play.cancelQuickmatch = function() {
	$('quickmatch_overlay').hide();
	$('quickmatch_overlay').removeClassName('loading');
	Devo.Core._destroyQuickmatchPoller();
}

Devo.Play.acceptInvite = function(invite_id, button) {
	Devo.Main.Helpers.ajax(Devo.options['say_url'], {
		params: '&topic=accept_invite&invite_id='+invite_id,
		loading: {
			callback: function() {
				$(button).down('img').show();
			}
		},
		success: {
			callback: function(json) {
				if (json.accepted == 'removed') {
					Devo.Play.removeInvite(json.invite_id);
				}
			}
		},
		complete: {
			callback: function() {
				$(button).down('img').hide();
			}
		}
	});
};

Devo.Play.rejectInvite = function(invite_id, button) {
	Devo.Main.Helpers.ajax(Devo.options['say_url'], {
		params: '&topic=reject_invite&invite_id='+invite_id,
		loading: {
			callback: function() {
				$(button).down('img').show();
			}
		},
		success: {
			callback: function(json) {
				if (json.rejected == 'ok') {
					Devo.Play.removeInvite(json.invite_id);
				}
			}
		},
		complete: {
			callback: function() {
				$(button).down('img').hide();
			}
		}
	});
};

Devo.Play.cancelGame = function(game_id) {
	var button_ok = $('game_'+game_id+'_list').down('.button-ok');
	var button = $(button_ok).visible() ? button : $('game_'+game_id+'_list').down('.button-cancel');

	Devo.Main.Helpers.ajax(Devo.options['say_url'], {
		params: '&topic=cancel_game&game_id='+game_id,
		loading: {
			callback: function() {
				$(button).down('img').show();
			}
		},
		success: {
			callback: function(json) {
				if (json.cancelled == 'ok') {
					if ($('my_ongoing_games').childElements().size() == 2) {
						window.setTimeout(function() {$('my_ongoing_games_none').show();$('my_ongoing_games_none').removeClassName('animated fadeOut');$('my_ongoing_games_none').addClassName('animated fadeIn');}, 1000);
					}
					$('game_'+json.game_id+'_list').addClassName('animated bounceOut');
					window.setTimeout(function() {$('game_'+json.game_id+'_list').remove();}, 900);
				}
			}
		},
		complete: {
			callback: function() {
				$(button).down('img').hide();
			}
		}
	});
};

Devo.Play.removeInvite = function(invite_id) {
	$('game_invite_' + invite_id).addClassName('animated fadeOutLeft');
	$('invites_input_' + invite_id).remove();
	window.setTimeout(function() {$('game_invite_' + invite_id).remove();}, 1000);
}

Devo.Game.toggleLobbyChat = function() {
	$('lobby_chat').toggle();
	$('profile_menu_strip').childElements().each(function(element) {
		element.removeClassName('selected');
	});
	if ($('lobby_chat').visible()) {
		Devo.Main._lobbyResizeWatcher();
		$('lobby_chat_toggler').addClassName('selected');
		$('lobby_chat_toggler').down('.notify').removeClassName('visible');
	};
};
