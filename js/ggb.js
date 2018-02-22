/**
 To display your ggbMaterial on a slide just drop the ID of it in the Array below and make sure there is a div with the same id inside a slide.
 You can find the MaterialId in the URL, its the last part of it.
 Algebra view of the material should be disabled, this option is only available in geogebra classic app.
 You have to fiddle the size and position of your construction inside ggb and save it back to the cloud that it fits into the given frame, because there is no option in the api to make the content fit a given size..Sorry.
 **/
ggbMaterial = [
    'D7XYwPfW',
    'E975hBTQ',
    'dCUjJyYC',
    'AV8DJmbp',
    'NS2jCyfX',
    'fTUzuQZh',
    `H6yqzYD4`, //'DKSpnBf7',
    'a7zr7JDf',
    's5uAXEVh',
    'asjMqdrG',//a7zr7JDf
    'CD56Amyj',
    'z5VVcUMA',
    'qxaCDXHJ',
    'qKBrMvjR',
    'GpjaA7B9',
    'vkQTJpFb',
    'uH2qBG2X',
    'ruWnqPhf',
    'ZUPQBh9U',
    'v5w64QaX', // Schranke B Umkreisradius / kürzeste Kante
    'sbV9FKTj',
    'MTfRrh2v',
    'SBY3FQUK',
    'sdqkCncf',
    'xW7jTZTy',
    'AY5wy4JR',
    'B2MGBsYS'
]
ggbApps = ggbMaterial.map((matId) => {
    return new GGBApplet({material_id: matId, borderColor:"#fff", width: 960, height: 600}, true);
    })

Reveal.addEventListener("ready", function() {
        ggbApps.forEach((app, i) => {
            app.inject(ggbMaterial[i]);
        })
})