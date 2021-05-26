console.log(1111111111111);
var keyStr='d48687d2a398448ba24c768b91b475a2';
function httpRequest(url,callback){
    var xml = new XMLHttpRequest();
    xml.open('GET',url,true);
    xml.onreadystatechange=function(){
        if(xml.readyState===4){
            callback(xml.responseText)
        }
    }
    xml.send()
}
function showWeather(result){
    console.log(result,'result');
    result = JSON.parse(result);
    var nowData = result.HeWeather6[0];
    var table = '<table><tr><th>城市</th><th>日期/时间</th><th>天气</th><th>温度</th><th>风向</th></tr>';
    table+='<tr>';
    table+='<td>'+nowData.basic.admin_area+'</td>';
    table+='<td>'+nowData.update.loc+'</td>';
    table+='<td>'+nowData.now.cond_txt+'</td>';
    table+='<td>'+nowData.now.tmp+'C'+'</td>';
    table+='<td>'+nowData.now.wind_dir+'C'+'</td>';
    table+='</tr>';
    table+='</table>';
document.getElementById('weather').innerHTML=table;
}
var city = localStorage.city;
city = city ? city : 'beijing';
var url = 'https://free-api.heweather.net/s6/weather/now?location='+city+'&key='+keyStr;
httpRequest(url,showWeather)