// ==UserScript==
// @name         FC esconde hilos
// @namespace    http://www.forocoches.com
// @version      0.1
// @description  Esconde hilos en FC en funcion del ID
// @author       You
// @match        http://www.forocoches.com/foro/forumdisplay.php?f=2
// @grant        none
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==
$(function(){
    
    var hilos = [4134937, 4130895, 4134948, 4131321, 4133039, 4033003, 4118054, 4133207, 4132625, 4133118, 4112584, 4118449, 4107186, 4107907, 4110748];
    
    $('#threadbits_forum_2 tr').each(function(){
        var idHilo = $(this).find('td[id^="td_threadtitle_"]').attr("id");
        idHilo = idHilo.split("_");
        idHilo = idHilo[2];
        for(var i = 0; i < hilos.length; i++)
        {
            if(hilos[i] == idHilo)
            {
                $(this).hide();
            }
        }
    });
});