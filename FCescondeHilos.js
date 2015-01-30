// ==UserScript==
// @name         FC esconde hilos
// @namespace    http://www.forocoches.com
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://www.forocoches.com/foro/forumdisplay.php?f=2
// @grant        none
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==
$(function(){
    
    var hilos = [];
    
    $('#threadbits_forum_2 tr').each(function(){
    	var idHilo = $(this).find('td[id^="td_threadtitle_"]').attr("id");
        idHilo = idHilo.split("_");
        idHilo = idHilo[2];
        for(var i = 0; i < hilos.length; i++)
        {
        	if(hilos[i] == idHilo)
            {
                console.log($(this));
            	$(this).hide();
            }
        }
    });
});

