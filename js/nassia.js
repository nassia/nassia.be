/** Get last 5 tweets */
if ($('#twitter').length) {
	var twitterWidgetId = '348547818933342208';
	var elementId = '';
	var numTweets = 5;
	var hyperlinkURLs = true;
	var showPhoto = false;
	var showTime = true;
	var timeFormatFunc = moment.fromNow;
	var showRetweets = true;
	var dataFormatFunc = function(result) {
		$.each(result, function(i, tweet) {
			console.log(tweet)
			// do some replacing, I want my old format back!
			tweet = tweet.replace('</p><p class="timePosted">Posted ', '<span class="spacer"/><small>');
			tweet = tweet.replace('</p>', '</small></p>');
			tweet = tweet.replace('<a href', '<a target="_blank" href'); // + links in new tabs/windows
			$('#twitter').append(tweet);
		});
	}
	twitterFetcher.fetch(twitterWidgetId, elementId, numTweets, hyperlinkURLs, showPhoto, showTime, timeFormatFunc, showRetweets, dataFormatFunc);
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
				var artist = scrobble.artist.name;
				var trackname = scrobble.name;
				var loved = (scrobble.loved == 1) ? ' <i class=\'icon-heart\'></i>' : '';
				var date = (scrobble.date !== undefined) ? (moment.unix(scrobble.date.uts)).fromNow() : 'now playing';
				$('#lastfm').append('<p>'+artist+' - '+trackname+loved+'<span class="spacer"/><small>'+date+'</small></p>');
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
				var loc = ((igram.location !== undefined) && (igram.location.name !== undefined)) ? ' at '+igram.location.name : '';
				var std_res_img_url = igram.images.standard_resolution.url;
				var thumb_res_img_url = igram.images.thumbnail.url;
				var likes = (igram.likes.count > 0) ? '<small class=\'pull-right\'><i class=\'icon-heart\'></i> '+igram.likes.count+'</small>' : '';
				var caption = ((igram.caption !== null) && (igram.caption.text !== null)) ? igram.caption.text : '';
				var captionFormatted = '<p>'+caption+' ('+date+loc+')'+likes+'</p>';
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
			autoScale: true
		}
	});
});
