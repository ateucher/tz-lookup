/* This code is based on code written for Rosetta Code.
 * http://rosettacode.org/wiki/Sutherland-Hodgman_polygon_clipping */

function inside(a, b, p) {
  return (b[0] - a[0]) * (p[1] - a[1]) > (b[1] - a[1]) * (p[0] - a[0]);
}

function intersection(a, b, m, n) {
  var px = a[0] - b[0],
      py = a[1] - b[1],
      qx = m[0] - n[0],
      qy = m[1] - n[1],
      n1 = a[0] * b[1] - a[1] * b[0],
      n2 = m[0] * n[1] - m[1] * n[0], 
      n3 = 1.0 / (px * qy - py * qx);

  return [(n1 * qx - n2 * px) * n3, (n1 * qy - n2 * py) * n3];
}

module.exports = function(subject, clip) {
  var q = subject,
      b = clip[clip.length - 1],
      a, p, m, n, i, j;

  for(i = 0; i !== clip.length; ++i) {
    a = b;
    b = clip[i];
    p = q;
    q = [];
    n = p[p.length - 1];

    for(j = 0; j !== p.length; ++j) {
      m = n;
      n = p[j];

      if(inside(a, b, n)) {
        if(!inside(a, b, m))
          q.push(intersection(a, b, m, n));

        q.push(n);
      }

      else if(inside(a, b, m))
        q.push(intersection(a, b, m, n));
    }
  }

  return q;
}