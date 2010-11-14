/** version 0.1 2009-04-30
 * @author      Andrea Giammarchi
 * @license     Mit Style License
 * @project     http://code.google.com/p/css2xpath/
 */

/** css2xpath - generic CSS to XPath selector transformer
 * @author      Andrea Giammarchi
 * @license     Mit Style License
 * @blog        http://webreflection.blogspot.com/
 * @project     http://code.google.com/p/css2xpath/
 * @version     0.1 - Converts correctly every SlickSpeed CSS selector [http://mootools.net/slickspeed/]
 * @note        stand alone vice-versa subproject [http://code.google.com/p/css2xpath/]
 * @info        http://www.w3.org/TR/CSS2/selector.html
 * @credits     some tips from Aristotle Pagaltzis [http://plasmasturm.org/log/444/]
 */
css2xpath = (function(){
    var re      = [
            // add @ for attribs
            /\[([^\]~\$\*\^\|\!]+)(=[^\]]+)?\]/g, "[@$1$2]",
            // multiple queries
            /\s*,\s*/g, "|",
            // , + ~ >
            /\s*(\+|~|>)\s*/g, "$1",
            //* ~ + >
            /([a-zA-Z0-9\_\-\*])~([a-zA-Z0-9\_\-\*])/g, "$1/following-sibling::$2",
            /([a-zA-Z0-9\_\-\*])\+([a-zA-Z0-9\_\-\*])/g, "$1/following-sibling::*[1]/self::$2",
            /([a-zA-Z0-9\_\-\*])>([a-zA-Z0-9\_\-\*])/g, "$1/$2",
            // all unescaped stuff escaped
            /\[([^=]+)=([^'|"][^\]]*)\]/g, "[$1='$2']",
            // all descendant or self to //
            /(^|[^a-zA-Z0-9\_\-\*])(#|\.)([a-zA-Z0-9\_\-]+)/g, "$1*$2$3",
            /([\>\+\|\~\,\s])([a-zA-Z\*]+)/g, '$1//$2',
            /\s+\/\//g, '//',
            // :first-child
            /([a-zA-Z0-9\_\-\*]+):first-child/g, "*[1]/self::$1",
            // :last-child
            /([a-zA-Z0-9\_\-\*]+):last-child/g, "$1[not(following-sibling::*)]",
            // :only-child
            /([a-zA-Z0-9\_\-\*]+):only-child/g, "*[last()=1]/self::$1",
            // :empty
            /([a-zA-Z0-9\_\-\*]+):empty/g, "$1[not(*) and not(normalize-space())]",
            // :not
            /([a-zA-Z0-9\_\-\*]+):not\(([^\)]*)\)/g, function(s, a, b){return a.concat("[not(", css2xpath(b).replace(/^[^\[]+\[([^\]]*)\].*$/g, "$1"), ")]");},
            // :nth-child
            /([a-zA-Z0-9\_\-\*]+):nth-child\(([^\)]*)\)/g, function(s, a, b){
            switch(b){
                case    "n":
                    return a;
                case    "even":
                    return "*[position() mod 2=0 and position()>=0]/self::" + a;
                case    "odd":
                    return a + "[(count(preceding-sibling::*) + 1) mod 2=1]";
                default:
                    b = (b || "0").replace(/^([0-9]*)n.*?([0-9]*)$/, "$1+$2").split("+");
                    b[1] = b[1] || "0";
                    return "*[(position()-".concat(b[1], ") mod ", b[0], "=0 and position()>=", b[1], "]/self::", a);
                }
            },
            // :contains(selectors)
            /:contains\(([^\)]*)\)/g, function(s, a){
            /*return "[contains(css:lower-case(string(.)),'" + a.toLowerCase() + "')]"; // it does not work in firefox 3*/
                return "[contains(string(.),'" + a + "')]";
            },
            // |= attrib
            /\[([a-zA-Z0-9\_\-]+)\|=([^\]]+)\]/g, "[@$1=$2 or starts-with(@$1,concat($2,'-'))]",
            // *= attrib
            /\[([a-zA-Z0-9\_\-]+)\*=([^\]]+)\]/g, "[contains(@$1,$2)]",
            // ~= attrib
            /\[([a-zA-Z0-9\_\-]+)~=([^\]]+)\]/g, "[contains(concat(' ',normalize-space(@$1),' '),concat(' ',$2,' '))]",
            // ^= attrib
            /\[([a-zA-Z0-9\_\-]+)\^=([^\]]+)\]/g, "[starts-with(@$1,$2)]",
            // $= attrib
            /\[([a-zA-Z0-9\_\-]+)\$=([^\]]+)\]/g, function(s, a, b){return "[substring(@".concat(a, ",string-length(@", a, ")-", b.length - 3, ")=", b, "]");},
            // != attrib
            /\[([a-zA-Z0-9\_\-]+)\!=([^\]]+)\]/g, "[not(@$1) or @$1!=$2]",
            // ids and classes
            /#([a-zA-Z0-9\_\-]+)/g, "[@id='$1']",
            /\.([a-zA-Z0-9\_\-]+)/g, "[contains(concat(' ',normalize-space(@class),' '),' $1 ')]",
            // normalize multiple filters
            /\]\[([^\]]+)/g, " and ($1)"
        ],
        length  = re.length
    ;
    return function css2xpath(s){
        var i = 0;
        while(i < length)
            s = s.replace(re[i++], re[i++]);
        return "//" + s;
    };
})();