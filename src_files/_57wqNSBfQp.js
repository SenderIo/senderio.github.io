;/*FB_PKG_DELIM*/

__d("WAWebMoment-br",["WAWeb-moment"],(function(a,b,c,d,e,f,g){function a(a,b,c){b={mm:"munutenn",MM:"miz",dd:"devezh"};return a+" "+i(b[c],a)}function b(a){switch(h(a)){case 1:case 3:case 4:case 5:case 9:return a+" bloaz";default:return a+" vloaz"}}function h(a){return a>9?h(a%10):a}function i(a,b){return b===2?j(a):a}function j(a){var b={m:"v",b:"v",d:"z"};return b[a.charAt(0)]===void 0?a:b[a.charAt(0)]+a.substring(1)}d=[/^gen/i,/^c[ʼ\']hwe/i,/^meu/i,/^ebr/i,/^mae/i,/^(mez|eve)/i,/^gou/i,/^eos/i,/^gwe/i,/^her/i,/^du/i,/^ker/i];e=/^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu|gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i;f=/^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu)/i;g=/^(gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i;var k=[/^sul/i,/^lun/i,/^meurzh/i,/^merc[ʼ\']her/i,/^yaou/i,/^gwener/i,/^sadorn/i],l=[/^Sul/i,/^Lun/i,/^Meu/i,/^Mer/i,/^Yao/i,/^Gwe/i,/^Sad/i],m=[/^Su/i,/^Lu/i,/^Me([^r]|$)/i,/^Mer/i,/^Ya/i,/^Gw/i,/^Sa/i];c("WAWeb-moment").defineLocale("br",{months:"Genver_C\u02bchwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C\u02bchwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc\u02bcher_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),weekdaysParse:m,fullWeekdaysParse:k,shortWeekdaysParse:l,minWeekdaysParse:m,monthsRegex:e,monthsShortRegex:e,monthsStrictRegex:f,monthsShortStrictRegex:g,monthsParse:d,longMonthsParse:d,shortMonthsParse:d,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY HH:mm",LLLL:"dddd, D [a viz] MMMM YYYY HH:mm"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc\u02bchoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec\u02bch da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s \u02bczo",s:"un nebeud segondenno\xf9",ss:"%d eilenn",m:"ur vunutenn",mm:a,h:"un eur",hh:"%d eur",d:"un devezh",dd:a,M:"ur miz",MM:a,y:"ur bloaz",yy:b},dayOfMonthOrdinalParse:/\d{1,2}(añ|vet)/,ordinal:function(a){var b=a===1?"a\xf1":"vet";return a+b},week:{dow:1,doy:4},meridiemParse:/a.m.|g.m./,isPM:function(a){return a==="g.m."},meridiem:function(a,b,c){return a<12?"a.m.":"g.m."}})}),34);