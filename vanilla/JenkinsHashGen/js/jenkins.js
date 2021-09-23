function onHashButtonClick(){
    let key = getKey();
    
    if(key == ""){
        document.getElementById('hashTable').style.display = "none";
        alert('Enter key please!');
    }
    else{
        let hashArray = getHashes(key);
        setTableValues(hashArray[0], hashArray[1], hashArray[2]);
    }
}

function getKey(){
    return document.getElementById('keyInput').value;
}

function setTableValues(signedHash, unsignedHash, hexHash){
    document.getElementById('hashTable').style.display = "";
    document.getElementById('signed').innerHTML = signedHash;
    document.getElementById('unsigned').innerHTML = unsignedHash;
    document.getElementById('hex').innerHTML='0x'+hexHash;
}

function onInputFieldChange(){
    let inpf = document.getElementById('keyInput');
    inpf.value = inpf.value.toUpperCase();
}

function calculateSignedHash(key){
    key = key.toLowerCase();
    var hash= 0;
    
    for(i=0;i<key.length;i++){
        hash+=key.charCodeAt(i);
        hash+=(hash<<10);
        hash^=(hash >>>6);
    }
    
    hash+=(hash<<3);
    hash ^=(hash>>>11);
    hash += (hash<<15);
    
    return hash;
}

function calculateUnsignedHash(signedHash){
    return (signedHash >>> 0);
}

function calculateHexHash(unsignedHash){
    return unsignedHash.toString(16).toUpperCase();
}

function getHashes(key){
    var signedHash = calculateSignedHash(key);
    var unsignedHash = calculateUnsignedHash(signedHash);
    var hexHash = calculateHexHash(unsignedHash);
    
    return [signedHash.toString(), unsignedHash.toString(), hexHash]
}

document.addEventListener("keydown", function(event){
    if(event.keyCode == 13){
     onHashButtonClick();   
    }
})
