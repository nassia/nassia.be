/** Get last 5 tweets */
if ($('#twitter').length) {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		timeout : 5000,
		cache: false,
		url: 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=nassia&count=5',
		success: function(result) {
			$.each(result, function(i, tweet) {
				$('#twitter').append('<p class=\'tweet\'>'+tweet.text+'<span class="spacer"/><small>'+moment(tweet.created_at).fromNow()+'</small></p>');
			});
		},
		error: function(jqXHR, status, errorMsg) {
			console.log(jqXHR);
			$('#twitter').append('<p>Couldn\'t retrieve data: ' + status + ' - ' + errorMsg + '</p>');
		}
	});
}

/** Get last 10 scrobbles */
if ($('#lastfm').length) {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		timeout : 5000,
		cache: false,
		url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nassia_s&extended=1&api_key=63f2426cee843e2cf84b36b2dd1a94de&format=json',
		success: function(result) {
			$.each(result.recenttracks.track, function(i, scrobble) {
				var loved = (scrobble.loved == 1) ? ' &hearts;' : '';
				var date = (scrobble.date !== undefined) ? moment(scrobble.date['#text']).fromNow() : 'now playing';
				$('#lastfm').append('<p>'+scrobble.artist.name+' - '+scrobble.name+loved+'<span class="spacer"/><small>'+date+'</small></p>');
			});
		},
		error: function(jqXHR, status, errorMsg) {
			console.log(jqXHR);
			$('#lastfm').append('<p>Couldn\'t retrieve data: ' + status + ' - ' + errorMsg + '</p>');
		}
	});
}

/** Get my latest jam */
if ($('#jam').length) {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		timeout : 5000,
		cache: false,
		url: 'http://api.thisismyjam.com/1/nassia.json',
		success: function(result) {
			var hasCurrentJam = result.person.hasCurrentJam;
			if (hasCurrentJam) {
				var rejams = (result.jam.rejamsCount > 0) ? ('has been rejammed '+result.jam.rejamsCount+' times') : '';
				var likes = (result.jam.likesCount > 0) ? ('has been liked '+result.jam.likesCount+' times') : '';
				var looksLikeIPickedAGreatTrack = '';
				if ((rejams.length !== 0) && (likes.length !== 0)) {
					looksLikeIPickedAGreatTrack = ', which '+rejams+' and '+likes+'! High five!';
				} else if (rejams.length !== 0) {
					looksLikeIPickedAGreatTrack = ', which '+rejams+'! High five!';
				} else if (likes.length !== 0) {
					looksLikeIPickedAGreatTrack = ', which '+likes+'!';
				}
				$('#jam').append('<p>This week I\'m jamming to <a href=\''+result.jam.url+'\' target=\'_blank\'>'+result.jam.artist+' - '+result.jam.title+'</a>'+looksLikeIPickedAGreatTrack+'</p>');
				$('#jam').append('<blockquote><em>'+result.jam.caption+'</em></blockquote>');
			} else {
				$('#jam').append('<p>Currently not jamming to anything :( Why not make me a suggestion?</p>');
			}
		},
		error: function(jqXHR, status, errorMsg) {
			console.log(jqXHR);
			$('#jam').append('<p>Couldn\'t retrieve data: ' + status + ' - ' + errorMsg + '</p>');
		}
	});
}

/** Get last 10 instagram pictures */
if ($('#instagram').length) {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		timeout : 5000,
		cache: false,
		url: 'https://api.instagram.com/v1/users/21311155/media/recent/?access_token=21311155.ab103e5.a7a20249e87f4a4db3614c2c3a203804&count=10',
		success: function(result) {
			var append = '<ul class=\'thumbnails\'>';
			$.each(result.data, function(i, igram) {
				var date = moment(igram.created_time, 'X').fromNow();
				var loc = (igram.location.name !== undefined) ? ' at '+igram.location.name : '';
				var std_res_img_url = igram.images.standard_resolution.url;
				var thumb_res_img_url = igram.images.thumbnail.url;
				var caption = igram.caption.text;
				var captionFormatted = '<p>'+caption+' ('+date+loc+')</p>';
				append += '<li><a class="fancybox" rel="instagramgroup" href="'+std_res_img_url+'" title="'+captionFormatted+'"><img src="'+thumb_res_img_url+'" alt="'+caption+'"></a></li>';
			});
			append += '</ul>';
			$('#instagram').append(append);
		},
		error: function(jqXHR, status, errorMsg) {
			console.log(jqXHR);
			$('#instagram').append('<p>Couldn\'t retrieve data: ' + status + ' - ' + errorMsg + '</p>');
		}
	});
}

/** Get last commit to Github */
if ($('#lastUpdatedOnGithub').length) {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		timeout : 5000,
		cache: false,
		url: 'https://api.github.com/repos/nassia/nassia.be',
		success: function(result) {
			var pushed = result.data.pushed_at;
			pushed = moment(pushed).fromNow();
			$('#lastUpdatedOnGithub').append('Last code update was ' + pushed + '.');
		},
		error: function(jqXHR, status, errorMsg) {
			console.log(jqXHR);
			$('#lastfm').append('<p>Couldn\'t retrieve data: ' + status + ' - ' + errorMsg + '</p>');
		}
	});
}

/** Show instagram images in a lightbox */
$(document).ready(function() {
	$(".fancybox").fancybox({
		helpers: {
			title: {
				type: 'inside'
			},
			overlay: {
				css: {
					'background': 'rgba(0, 0, 0, 0.8)' // match bootstrap's modal background colour
				}
			},
			autoScale: true,
		}
	});
});
