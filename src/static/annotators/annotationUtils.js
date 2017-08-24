function doWithtUntagged(text, f) {
    return text.replace(/(<[^>]+>)(.+)(<\/.+>)/g, function(n0, n1, n2, n3){ return n1 + f(n2) + n3 });
}

function isTagged(text) {
    return text.match(/^<([^>]+>)(.+)(<\/.+>)$/g) != null;
}

function splitByTag(text) {
    return text.split(/(<[^(>|<\/)]+>[^<\/]*<\/[^>]+>)/g);
}

module.exports = {
    doWithtUntagged: doWithtUntagged,
    isTagged: isTagged,
    splitByTag: splitByTag
}