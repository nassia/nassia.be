/** Get last 5 tweets */
if ($('#twitter').length) {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		cache: false,
		url: 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=nassia&count=5',
		success: function(result) {
			$.each(result, function(i, tweet) {
				$('#twitter').append('<p class=\'tweet\'>'+tweet.text+'<br/><small>'+tweet.created_at+'</small></p>');
			});
		}
	});
}

/** Get last 10 scrobbles */
if ($('#lastfm').length) {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		cache: false,
		url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nassia_s&api_key=63f2426cee843e2cf84b36b2dd1a94de&format=json',
		success: function(result) {
			$.each(result.recenttracks.track, function(i, scrobble) {
				$('#lastfm').append('<p>'+scrobble.artist["#text"]+' - '+scrobble.name+'</p>');
			});
		}
	});
}

/** Get my latest jam */
if ($('#jam').length) {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		cache: false,
		url: 'http://api.thisismyjam.com/1/nassia.json',
		success: function(result) {
			var likes = (result.jam.likesCount > 0) ? (', which has been liked '+result.jam.likesCount+' times!</p>') : '';
			$('#jam').append('<p>Currently jamming to: <a href=\''+result.jam.url+'\' target=\'_blank\'>'+result.jam.artist+' - '+result.jam.title+'</a>'+likes+'</p>');
			$('#jam').append('<blockquote><em>'+result.jam.caption+'</em></blockquote>');
		}
	});
}

/** Get last 10 instagram pictures */
if ($('#instagram').length) {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		cache: false,
		url: 'https://api.instagram.com/v1/users/21311155/media/recent/?access_token=21311155.ab103e5.a7a20249e87f4a4db3614c2c3a203804&count=10',
		success: function(result) {
			var append = '<ul class=\'thumbnails\'>';
			$.each(result.data, function(i, igram) {
				append += '<li><a href="'+igram.link+'" target="_blank"><img src="'+igram.images.thumbnail.url+'" title="'+igram.caption.text+'"></a></li>';
			});
			append += '</ul>';
			$('#instagram').append(append);
		}
	});
}

