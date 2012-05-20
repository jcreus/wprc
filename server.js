/*var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\nApp (wprc) is running on Node.JS ' + process.version);
}).listen(17785);*/
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

	//var x = '\u000314[[\u000307Talk:St. Hebron, Florida\u000314]]\u00034 \u000310 \u000302http://en.wikipedia.org/w/index.php?diff=493518447&oldid=400807196\u0003 \u00035*\u0003 \u000303Koavf\u0003 \u00035*\u0003 (+25) \u000310tag, replaced: {{WikiProject Florida}} → {{WikiProject Florida |class=stub |importance=}} using [[Project:AWB|AWB]]\u0003'.match(/\[\[\u000307(.*?)\u000314\]\].*?\u000302(.*?)\u0003 \u00035\*\u0003 \u000303(.*?)\u0003.*?\((.*?)\).*?\u000310(.*?)\u0003/);

var io = require('socket.io').listen(3141, {log: false});

var irc = require('irc');
var client = new irc.Client('irc.wikimedia.org','joan_bot', { channels: ['#en.wikipedia'] });
client.addListener('message#en.wikipedia', function (from, message) {
	var r = message.replaceAll("\u03(\d{1,2}(,\d{1,2})?)?", ""); 
	var x = r.match(/\[\[\u000307(.*?)\u000314\]\]\u00034 (.*?)\u000310.*?\u000302(.*?)\u0003 \u00035\*\u0003 \u000303(.*?)\u0003.*?\((.*?)\).*?\u000310(.*?)\u0003/);
	if (!x) return;
	var page = x[1];
	var mods = x[2];
	var durl = x[3];
	var user = x[4];
	var chan = x[5];
	var desc = x[6];
	io.sockets.emit('edit', {page: page, mods: mods, url: durl, user: user, chan: chan, desc: desc});
//\u000314[[\u000307Talk:St. Hebron, Florida\u000314]]\u00034 \u000310 \u000302http://en.wikipedia.org/w/index.php?diff=493518447&oldid=400807196\u0003 \u00035*\u0003 \u000303Koavf\u0003 \u00035*\u0003 (+25) \u000310tag, replaced: {{WikiProject Florida}} → {{WikiProject Florida |class=stub |importance=}} using [[Project:AWB|AWB]]\u0003
});
