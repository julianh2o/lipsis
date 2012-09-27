(function($) {
    $.fn.lipsis = function(options) {
        options = $.extend({},$.fn.lipsis.options,options);
        this.each(function() {
            $.fn.lipsis.update($(this),options);
        });
    }

    $.fn.lipsis.options = {
        rows: 2,
    };

    function getAllTextNodes($el) {
        var nodes = [];

        var contents = $el.contents();
        $.each(contents,function() {
            if (this.nodeType == 3) {
                nodes.push(this);
            } else {
                nodes = nodes.concat(getAllTextNodes($(this)));
            }
        });
        return nodes;
    }

    function findTargetNode(nodeData,length) {
        var currentLength = 0;
        var i = 0;
        while(true) {
            if (i >= nodeData.length) break;
            next = currentLength + nodeData[i].length;
            if (length && next >= length) {
                return {index:i,preceedingLength:currentLength};
            }

            currentLength = next;
            i++;
        }
        return {index:-1,preceedingLength:currentLength};
    }

    function getNodeData(nodes) {
        var nodeData = [];
        for (i in nodes) {
            nodeData[i] = nodes[i].data;
        }
        return nodeData;
    }

    function shortenNodesToLength(nodes,nodeData,length) {
        var info = findTargetNode(nodeData,length);

        for(i=0; i<nodes.length; i++) {
            if (i<info.index) { //Nodes before target are kept in full
                nodes[i].data = nodeData[i];
            } else if (i>info.index) { //Nodes after target are erased
                nodes[i].data = "";
            } else {
                //Handle the partial node
                var target = nodes[info.index];
                var remaining = length - info.preceedingLength;
                target.data = nodeData[info.index].substring(0,remaining) + "...";
            }
        }
    }

    function getTotalLength(nodes) {
        var total = 0;
        for(i in nodes) {
            total += nodes[i].data.length;
        }
        return total;
    }

    $.fn.lipsis.update = function($el) {
        console.log("Update happening");
        console.log("ptext",$el.text());

        var wordWrap = $el.css("word-wrap");
        $el.css("word-wrap","break-word");

        var nodes = getAllTextNodes($el);
        var nodeData = getNodeData(nodes);

        var allNodesLength = getTotalLength(nodes);
        var newLength = Math.round(allNodesLength/2);

        var height = null;
        var i = 1;
        while(true) {
            shortenNodesToLength(nodes,nodeData,i);
            if (height != null) {
                var newHeight = $el.height();
                if (newHeight > height) {
                    break;
                }
            }
            height = $el.height();
            i++;
        }
        i--;
        console.log(i);
        shortenNodesToLength(nodes,nodeData,i);

        $el.css("word-wrap",wordWrap);
    }
})(jQuery);
