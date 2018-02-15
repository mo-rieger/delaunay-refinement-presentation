thankyou();
loadKey()
function loadKey() {
    var model = key
    var angle = 30
    var vertices = Graph.fitVerticesInto(model.vertices, 900, 500);
    var edges = model.edges.slice();
    triangulate.simple(vertices, edges, model.faces);
    var qe = triangulate.makeQuadEdge(vertices, edges);
    triangulate.refineToDelaunay(vertices, edges, qe.coEdges, qe.sideEdges);
    vertices0 = vertices.slice();
    edges0 = edges.slice();
    coEdges0 = [];
    sideEdges0 = [];
    for (var j = 0; j < edges.length; ++j) {
        coEdges0[j] = qe.coEdges[j].slice();
        sideEdges0[j] = qe.sideEdges[j].slice();
    }
    trace = [];
    triangulate.refineToRuppert(vertices, edges, qe.coEdges, qe.sideEdges, {
        minAngle: angle,
        maxSteinerPoints: 200,
        trace: trace
    });
}
function thankyou(){
  var canvas = $('#ty canvas');
  var vertices = Graph.fitVerticesInto(ty.vertices, 900, 800);
  var edges = ty.edges.slice();
  var vertices2 = vertices.slice();
  var edges2 = edges.slice();
  var trace2 = [];
  triangulate.simple(vertices, edges, ty.faces, trace2);
  var qe = triangulate.makeQuadEdge(vertices, edges);
  var vertices1 = vertices.slice();
  var edges1 = edges.slice();
  var coEdges1 = [];
  var sideEdges1 = [];
  for (var j = 0; j < edges.length; ++j) {
    coEdges1[j] = qe.coEdges[j].slice();
    sideEdges1[j] = qe.sideEdges[j].slice();
  }
  var trace1 = [];
  triangulate.refineToDelaunay(
    vertices, edges, qe.coEdges, qe.sideEdges, trace1);
  var vertices0 = vertices.slice();
  var edges0 = edges.slice();
  var coEdges0 = [];
  var sideEdges0 = [];
  for (var j = 0; j < edges.length; ++j) {
    coEdges0[j] = qe.coEdges[j].slice();
    sideEdges0[j] = qe.sideEdges[j].slice();
  }
  var trace0 = [];
  triangulate.refineToRuppert(vertices, edges, qe.coEdges, qe.sideEdges, {
    minAngle: 25,
    maxSteinerPoints: 200,
    trace: trace0
  });

  var g = new Graph(vertices, edges);
  g.vertexStyle = {
    radius: 1,
    color: '#222'
  };
  g.edgeStyle = {
    color: '#222',
    width: 3
  };
  g.draw(canvas);

  var interval;
Reveal.addEventListener( 'ty', function() {

    var vertices;
    var edges;
    var coEdges;
    var sideEdges;
    var h;

    if (interval !== undefined)
      clearInterval(interval);
    var l = 0;
    interval = setInterval(function () {
      if (l == 0) {
        vertices = vertices2.slice();
        edges = edges2.slice();
        h = new Graph(vertices, edges);
        h.vertexStyle = g.vertexStyle;
        h.edgeStyle = g.edgeStyle;
      }
      if (l < trace2.length) {
        var t = trace2[l];
        edges.push(t.addDiag);
      }
      if (l == trace2.length) {
        vertices = vertices1.slice();
        edges = edges1.slice();
        coEdges = [];
        sideEdges = [];
        for (var j = 0; j < edges.length; ++j) {
          coEdges[j] = coEdges1[j].slice();
          sideEdges[j] = sideEdges1[j].slice();
        }
        h = new Graph(vertices, edges);
        h.vertexStyle = g.vertexStyle;
        h.edgeStyle = g.edgeStyle;
      }
      if (trace2.length <= l && l < trace2.length + trace1.length) {
        var t = trace1[l - trace2.length];
        if (t.flippedTo !== undefined)
          edges[t.ensured] = t.flippedTo;
      }
      if (l == trace2.length + trace1.length) {
        vertices = vertices0.slice();
        edges = edges0.slice();
        coEdges = [];
        sideEdges = [];
        for (var j = 0; j < edges.length; ++j) {
          coEdges[j] = coEdges0[j].slice();
          sideEdges[j] = sideEdges0[j].slice();
        }
        h = new Graph(vertices, edges);
        h.vertexStyle = g.vertexStyle;
        h.edgeStyle = g.edgeStyle;
      }
      if (
        trace2.length + trace1.length <= l &&
        l < trace2.length + trace1.length + trace0.length
      ) {
        var t = trace0[l - trace1.length - trace2.length];
        if (t.split !== undefined) {
          for (var s = 0; s < t.split.length; ++s) {
            var j = t.split[s];
            triangulate.splitEdge(vertices, edges, coEdges, sideEdges, j);
          }
        }
        if (t.insert !== undefined) {
          var k = t.insert % 2, j = (t.insert - k) / 2;
          var a = vertices[edges[j][0]];
          var b = vertices[coEdges[j][k]];
          var c = vertices[edges[j][1]];
          var p = geom.circumcenter(a, b, c);
          triangulate.tryInsertPoint(vertices, edges, coEdges, sideEdges, p, j);
        }
      }
      if (trace2.length + trace1.length + trace0.length <= l) {
        clearInterval(interval);
        interval = undefined;
      }
      canvas.clearCanvas();
      h.draw(canvas);
      ++l;
    }, 50);
}, false );
}
Reveal.addEventListener( 'key', function() {
    refineKey(false)
}, false );

function refineKey( showTrace ) {
    var canvas = $('#key canvas');
    var interval;
    var vertices = vertices0.slice();
    var edges = edges0.slice();
    var coEdges = [];
    var sideEdges = [];
    for (var j = 0; j < edges.length; ++j) {
        coEdges[j] = coEdges0[j].slice();
        sideEdges[j] = sideEdges0[j].slice();
    }
    var h = new Graph(vertices, edges);
    h.vertexStyle = {
        radius: 1,
        color: '#222'
    };
    h.edgeStyle = {
        color: '#222',
        width: 3
    };
    canvas.clearCanvas();
    h.draw(canvas);
    if ( showTrace ) {
        if (interval !== undefined)
            clearInterval(interval);
        var l = 0;
        var steiner = 0;
        interval = setInterval(function () {
            if (l < trace.length) {
                var t = trace[l];
                ++l;
                if (t.split !== undefined) {
                    for (var s = 0; s < t.split.length; ++s) {
                        var j = t.split[s];
                        triangulate.splitEdge(vertices, edges, coEdges, sideEdges, j);
                        ++steiner;
                    }
                }
                if (t.insert !== undefined) {
                    var k = t.insert % 2, j = (t.insert - k) / 2;
                    var a = vertices[edges[j][0]];
                    var b = vertices[coEdges[j][k]];
                    var c = vertices[edges[j][1]];
                    var p = geom.circumcenter(a, b, c);
                    triangulate.tryInsertPoint(vertices, edges, coEdges, sideEdges, p, j);
                    ++steiner;
                }
                canvas.clearCanvas();
                h.draw(canvas);
            } else {
                clearInterval(interval);
                interval = undefined;
            }
        }, 150);
    }
}
