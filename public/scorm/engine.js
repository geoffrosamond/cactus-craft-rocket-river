(function (root) {
  "use strict";

  var KEEL = 0.5;
  var MASTERY = 80;
  var ASSESSMENT = {
    chartDepth: 4,
    freeboard: 1.2,
    loa: 12.8,
    draft: 1.22,
    bridleForward: 5.5,
    bridleLoop: 6,
    chainOnBoard: 80,
    clearance: 80,
    scopeTarget: 7,
    stayStart: "16:00",
    mooringField: false,
    extremes: [
      { time: "03:10", height: 0.3 },
      { time: "09:25", height: 1.9 },
      { time: "15:40", height: 0.4 },
      { time: "21:55", height: 1.7 },
    ],
  };

  function clone(plan) {
    return {
      chartDepth: plan.chartDepth,
      freeboard: plan.freeboard,
      loa: plan.loa,
      draft: plan.draft,
      bridleForward: plan.bridleForward,
      bridleLoop: plan.bridleLoop,
      chainOnBoard: plan.chainOnBoard,
      clearance: plan.clearance,
      scopeTarget: plan.scopeTarget,
      stayStart: plan.stayStart,
      mooringField: plan.mooringField,
      extremes: plan.extremes.map(function (point) {
        return { time: point.time, height: point.height };
      }),
    };
  }

  function parseClock(value) {
    var match = /^(\d{1,2}):(\d{2})$/.exec(String(value || "").trim());
    if (!match) return null;
    var hour = Number(match[1]);
    var minute = Number(match[2]);
    if (hour > 23 || minute > 59) return null;
    return hour * 60 + minute;
  }

  function formatClock(minutes) {
    var wrapped = ((Math.round(minutes) % 1440) + 1440) % 1440;
    var hour = Math.floor(wrapped / 60);
    var minute = wrapped % 60;
    return String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0");
  }

  function metres(value) {
    return Number(value).toFixed(1) + " m";
  }

  function ratioText(value) {
    return Number(value).toFixed(2) + ":1";
  }

  function tideHeight(atMin, extremes) {
    if (!extremes.length) return 0;
    if (extremes.length === 1) return extremes[0].height;
    var span = 1440;
    var points = [];
    [-span, 0, span, span * 2].forEach(function (shift) {
      extremes.forEach(function (extreme) {
        points.push({ min: extreme.min + shift, height: extreme.height });
      });
    });
    points.sort(function (a, b) {
      return a.min - b.min;
    });
    var t = atMin;
    while (t < points[0].min) t += span;
    while (t > points[points.length - 1].min) t -= span;
    for (var i = 0; i < points.length - 1; i++) {
      var left = points[i];
      var right = points[i + 1];
      if (t >= left.min && t <= right.min) {
        var u = (t - left.min) / (right.min - left.min || 1);
        return left.height + (right.height - left.height) * (1 - Math.cos(Math.PI * u)) / 2;
      }
    }
    return points[points.length - 1].height;
  }

  function windowTide(startMin, extremes) {
    var end = startMin + 1440;
    var maxH = tideHeight(startMin, extremes);
    var minH = maxH;
    var maxAt = startMin;
    var minAt = startMin;
    function consider(t) {
      var height = tideHeight(t, extremes);
      if (height > maxH) {
        maxH = height;
        maxAt = t;
      }
      if (height < minH) {
        minH = height;
        minAt = t;
      }
    }
    consider(end);
    extremes.forEach(function (extreme) {
      [-1440, 0, 1440, 2880].forEach(function (shift) {
        var t = extreme.min + shift;
        if (t >= startMin && t <= end) consider(t);
      });
    });
    return { maxH: maxH, minH: minH, maxAt: maxAt, minAt: minAt };
  }

  function buildPlan(input) {
    var errors = [];
    if (!(input.chartDepth > 0)) errors.push("Chart depth must be greater than zero.");
    if (!(input.scopeTarget >= 4)) errors.push("Scope target must be at least 4:1 for a tidal stay.");
    var start = parseClock(input.stayStart);
    if (start === null) errors.push("Stay start must be HH:MM.");
    var extremes = [];
    var seen = {};
    input.extremes.forEach(function (point) {
      var min = parseClock(point.time);
      if (min === null) {
        errors.push("A tide time is not HH:MM.");
        return;
      }
      if (seen[min]) errors.push("Two tides share a time.");
      seen[min] = true;
      extremes.push({ min: min, height: Number(point.height) });
    });
    if (errors.length || start === null || extremes.length < 2) {
      return { ok: false, errors: errors, cleared: false, reasons: [] };
    }
    var marks = windowTide(start, extremes);
    function verticalAt(tide) {
      return input.chartDepth + tide + input.freeboard;
    }
    var dHigh = verticalAt(marks.maxH);
    var dLow = verticalAt(marks.minH);
    var workingRode = input.scopeTarget * dHigh;
    function pointAt(offset) {
      var tide = tideHeight(start + offset, extremes);
      var vertical = verticalAt(tide);
      var horizontal = Math.sqrt(Math.max(0, workingRode * workingRode - vertical * vertical));
      return {
        label: formatClock(start + offset),
        tide: tide,
        vertical: vertical,
        scope: workingRode / vertical,
        swingRatio: horizontal / vertical,
        horizontal: horizontal,
        swingRadius: horizontal + input.bridleForward + input.loa,
      };
    }
    var samples = [];
    for (var offset = 0; offset <= 1440; offset += 30) samples.push(pointAt(offset));
    var hourly = [];
    for (var hour = 0; hour <= 1440; hour += 60) hourly.push(pointAt(hour));
    var low = pointAt(marks.minAt - start);
    var waterLow = input.chartDepth + marks.minH;
    var underKeel = waterLow - input.draft;
    var totalVeer = workingRode + input.bridleLoop;
    var reasons = [];
    if (input.mooringField) reasons.push("The drop is between mooring buoys. Do not anchor there.");
    if (totalVeer > input.chainOnBoard + 0.05) reasons.push("Not enough chain for the working rode plus the bridle loop.");
    if (low.swingRadius > input.clearance + 0.05) {
      reasons.push("Low-water swing radius is " + metres(low.swingRadius) + " and clearance is only " + metres(input.clearance) + ".");
    }
    if (underKeel < KEEL) reasons.push("Low water does not leave half a metre under the keel.");
    return {
      ok: true,
      errors: [],
      reasons: reasons,
      cleared: reasons.length === 0,
      samples: samples,
      hourly: hourly,
      highTime: formatClock(marks.maxAt),
      lowTime: formatClock(marks.minAt),
      highTide: marks.maxH,
      lowTide: marks.minH,
      dHigh: dHigh,
      dLow: dLow,
      workingRode: workingRode,
      totalVeer: totalVeer,
      scopeAtHigh: workingRode / dHigh,
      scopeAtLow: workingRode / dLow,
      swingRatioAtLow: low.swingRatio,
      horizontalAtLow: low.horizontal,
      swingAtLow: low.swingRadius,
      swingAtHigh: pointAt(marks.maxAt - start).swingRadius,
      pull: (Math.asin(Math.min(1, dHigh / workingRode)) * 180) / Math.PI,
      underKeel: underKeel,
      waterLow: waterLow,
      naiveScope: (input.scopeTarget * input.chartDepth) / dHigh,
      windlass: totalVeer * 2,
    };
  }

  function samePlan(input) {
    if (Number(input.clearance) !== 80 || Number(input.scopeTarget) !== 7 || input.stayStart !== "16:00" || input.mooringField) return false;
    var keys = ["chartDepth", "freeboard", "loa", "draft", "bridleForward", "bridleLoop", "chainOnBoard"];
    for (var i = 0; i < keys.length; i++) {
      if (Math.abs(Number(input[keys[i]]) - ASSESSMENT[keys[i]]) > 0.001) return false;
    }
    if (input.extremes.length !== 4) return false;
    for (var j = 0; j < 4; j++) {
      if (input.extremes[j].time !== ASSESSMENT.extremes[j].time) return false;
      if (Math.abs(Number(input.extremes[j].height) - ASSESSMENT.extremes[j].height) > 0.001) return false;
    }
    return true;
  }

  var lessonPlan = buildPlan(ASSESSMENT);
  var rode = metres(lessonPlan.workingRode);
  var radius = metres(lessonPlan.swingAtLow);
  var horizontal = metres(lessonPlan.horizontalAtLow);

  var QUESTIONS = [
    ["Joe Fox walks through six components of anchoring the Lagoon 42. Which set is the one in the film?", ["Anchor; wind and tidal flow; how much chain you drop; setting the hook; the bridle; communication and maneuvering.", "Lifejacket, liferaft, EPIRB, flares, grab-bag, and a VHF check.", "Chartplotter, AIS, radar, wind instrument, depth alarm, and a messenger.", "Sail plan, reef, traveller, vang, outhaul, and halyard tension."], 0, "The film’s job is the anchor, wind and tide, the amount of chain, setting it, the bridle, and bow-to-helm communication."],
    ["What are the three prep steps before the anchor goes down?", ["Stop the engine, dump the locker, and leave the helm.", "Remote on deck; bridle and gear clear of the chain; prime the anchor over the roller.", "Clip the bridle on in the locker and drop them together.", "Motor astern at full throttle before the anchor leaves the roller."], 1, "Remote in hand, nothing fouling the run, and the anchor already started over the roller."],
    ["In the film, for light and benign wind, how much chain does Joe put out?", ["The boat’s length, regardless of depth.", "Ten times the depth.", "Three to four times the depth.", "One metre of chain per knot of wind."], 2, "Light air in the film is 3–4× depth. A 24-hour tidal stay in this module still does not go below 4:1, and the multiple is applied at high water."],
    ["Wind around 20 knots, ready for 25. What multiple does he use?", ["Stay at 3× if the anchor is oversized.", "About 5, 6, or 7 times the depth.", "Twice the depth, because it is all chain.", "Only the 5–6 m bridle loop."], 1, "Around 20 knots he moves to 5–7×. The assessment uses 7:1."],
    ["No chain counter. This windlass pays 1 metre every 2 seconds. How long is 15 metres?", ["15 seconds.", "30 seconds.", "45 seconds.", "2 minutes."], 1, "Fifteen metres at 1 metre every 2 seconds is 30 seconds. That is his own example."],
    ["You anchor at 16:00 for 24 hours. Highs are 1.7 m at 21:55 and 1.9 m at 09:25. Lows are 0.3 m at 03:10 and 0.4 m at 15:40. Which height sets the scope?", ["1.7 m at 21:55, the next high.", "0.3 m, the shallowest water.", "The average of the four.", "1.9 m at 09:25, the highest water while you are on the hook."], 3, "Scope is worst at the deepest moment of the stay. Tonight’s high is not the highest water you will sit through."],
    ["Chart depth 4.0 m, bow roller 1.2 m, high water 1.9 m, target 7:1. Working rode before the bridle loop?", ["28.0 m — 7 × 4.0.", "36.4 m — roller included, tide ignored.", "41.3 m — tide included, roller ignored.", rode + " — 7 × (4.0 + 1.9 + 1.2)."], 3, "Roller-to-seabed at high water is 7.1 m. Working rode is " + rode + ". 28 m becomes only " + ratioText(lessonPlan.naiveScope) + " when the tide is in."],
    ["Working rode " + rode + ". Low water 0.3 m so roller depth is 5.5 m. Bridle reaches 5.5 m and the boat is 12.8 m. Low-water swing radius?", [rode + " — the rode alone.", metres(lessonPlan.totalVeer) + " — rode plus the loop.", radius + " — reach plus bridle plus length.", "12.8 m — the bridle stops the swing."], 2, "Horizontal reach is " + horizontal + ". Radius is that plus 5.5 m plus 12.8 m = " + radius + ". Swing ratio " + ratioText(lessonPlan.swingRatioAtLow) + "."],
    ["Same plan, 80 m of chain, nearest yacht 60 m from the anchor. What do you do?", ["Deploy. Scope is 7:1 and the chain is on board.", "Shorten the rode until the circle fits inside 60 m, then deploy.", "Do not deploy. Low-water swing is " + radius + ". Shortening the rode gives up 7:1 at high water.", "Deploy between the mooring buoys so their warps stop you."], 2, "Both gates have to pass. Cutting scope to buy room is how boats drag on top of the tide."],
    ["When is the bridle actually doing its job?", ["The hook is passed through a link and the windlass stays tight.", "The hook is over one whole link, the pin is home, and you have veered another 5–6 m so the chain hangs in a slack loop.", "The bridle is made fast to the shank before you drop.", "The chain is slack on the seabed and the engines are stopped."], 1, "Over a whole link, pin home, then 5–6 m more. A hook through the link jams on the way up. The bridle damps horsing. It does not shrink the circle to the length of the boat."],
  ].map(function (row) {
    return { stem: row[0], choices: row[1], answer: row[2], why: row[3] };
  });

  function findApi(win) {
    var seen = [];
    var current = win;
    for (var hop = 0; hop < 8 && current; hop++) {
      if (seen.indexOf(current) !== -1) break;
      seen.push(current);
      if (current.API && typeof current.API.LMSInitialize === "function" && !current.API.__hwsShim) return current.API;
      if (current.parent && current.parent !== current) current = current.parent;
      else break;
    }
    if (win.opener && win.opener.API && !win.opener.API.__hwsShim) return win.opener.API;
    return null;
  }

  function installShim() {
    if (root.API && root.API.__hwsShim) return root.API;
    var key = "hws-scorm-package";
    var store = {};
    try {
      store = JSON.parse(root.localStorage.getItem(key) || "{}") || {};
    } catch (error) {
      store = {};
    }
    var initialized = false;
    var api = {
      __hwsShim: true,
      LMSInitialize: function () {
        initialized = true;
        if (!store["cmi.core.lesson_status"]) store["cmi.core.lesson_status"] = "not attempted";
        store["cmi.core.student_name"] = store["cmi.core.student_name"] || "Preview Learner";
        store["cmi.core.score.min"] = "0";
        store["cmi.core.score.max"] = "100";
        return "true";
      },
      LMSFinish: function () {
        initialized = false;
        root.localStorage.setItem(key, JSON.stringify(store));
        return "true";
      },
      LMSGetValue: function (name) {
        return store[name] || "";
      },
      LMSSetValue: function (name, value) {
        if (!initialized) return "false";
        if (name === "cmi.suspend_data" && String(value).length > 4096) return "false";
        store[name] = String(value);
        return "true";
      },
      LMSCommit: function () {
        root.localStorage.setItem(key, JSON.stringify(store));
        return "true";
      },
      LMSGetLastError: function () {
        return "0";
      },
      LMSGetErrorString: function () {
        return "No error";
      },
      LMSGetDiagnostic: function () {
        return "";
      },
    };
    root.API = api;
    return api;
  }

  function esc(value) {
    return String(value)
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">");
  }

  function polyline(samples, key, min, max) {
    var w = 640;
    var h = 180;
    var pad = 16;
    return samples
      .map(function (sample, index) {
        var x = pad + (index / (samples.length - 1)) * (w - pad * 2);
        var y = h - pad - ((sample[key] - min) / (max - min || 1)) * (h - pad * 2);
        return x.toFixed(1) + "," + y.toFixed(1);
      })
      .join(" ");
  }

  function boot() {
    var lms = findApi(root);
    var api = lms || installShim();
    api.LMSInitialize("");
    if (!api.LMSGetValue("cmi.core.lesson_status") || api.LMSGetValue("cmi.core.lesson_status") === "not attempted") {
      api.LMSSetValue("cmi.core.lesson_status", "incomplete");
    }
    api.LMSSetValue("cmi.core.score.min", "0");
    api.LMSSetValue("cmi.core.score.max", "100");
    api.LMSSetValue("cmi.core.exit", "suspend");
    var saved = {};
    try {
      saved = JSON.parse(api.LMSGetValue("cmi.suspend_data") || "{}") || {};
    } catch (error) {
      saved = {};
    }
    var step = typeof saved.step === "number" ? saved.step : 0;
    var answers = Array.isArray(saved.answers) ? saved.answers.slice(0, 10) : [];
    while (answers.length < 10) answers.push(null);
    var qIndex = 0;
    for (var qi = 0; qi < 10; qi++) {
      if (answers[qi] === null || answers[qi] === undefined) {
        qIndex = qi;
        break;
      }
      qIndex = qi;
    }
    var deployCleared = saved.deployCleared === true;
    var best = typeof saved.best === "number" ? saved.best : null;
    var plan = clone(ASSESSMENT);
    var started = Date.now();

    var app = document.getElementById("app");
    app.innerHTML = document.getElementById("shell").innerHTML;
    var steps = ["Brief", "Six", "Scope", "Swing", "Chart", "Bridle", "Quiz", "Record"];

    function score() {
      var correct = 0;
      var complete = true;
      QUESTIONS.forEach(function (question, index) {
        if (answers[index] === null || answers[index] === undefined) complete = false;
        else if (answers[index] === question.answer) correct += 1;
      });
      return { correct: correct, complete: complete, percent: Math.round((correct / QUESTIONS.length) * 100) };
    }

    function persist() {
      var sitting = score();
      if (sitting.complete) best = Math.max(best === null ? sitting.percent : best, sitting.percent);
      var lesson = "incomplete";
      if (best !== null && best >= MASTERY && deployCleared) lesson = "passed";
      else if (sitting.complete && sitting.percent < MASTERY) lesson = "failed";
      var elapsed = Math.floor((Date.now() - started) / 1000);
      var hours = Math.floor(elapsed / 3600);
      var minutes = Math.floor((elapsed % 3600) / 60);
      var seconds = elapsed % 60;
      api.LMSSetValue("cmi.core.lesson_location", String(step));
      api.LMSSetValue("cmi.core.lesson_status", lesson);
      api.LMSSetValue("cmi.core.exit", "suspend");
      api.LMSSetValue(
        "cmi.core.session_time",
        String(hours).padStart(4, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0") + ".00",
      );
      if (best !== null) api.LMSSetValue("cmi.core.score.raw", String(best));
      api.LMSSetValue(
        "cmi.suspend_data",
        JSON.stringify({ step: step, answers: answers, deployCleared: deployCleared, best: best }),
      );
      api.LMSCommit("");
      var pill = document.getElementById("pill");
      var passed = best !== null && best >= MASTERY && deployCleared;
      pill.textContent = passed ? "Passed" : sitting.complete && best !== null && best < MASTERY ? "Failed" : "In progress";
      pill.className = "pill" + (passed ? " ok" : "");
    }

    function readPlan() {
      plan.chartDepth = Number(document.getElementById("chartDepth").value);
      plan.freeboard = Number(document.getElementById("freeboard").value);
      plan.loa = Number(document.getElementById("loa").value);
      plan.draft = Number(document.getElementById("draft").value);
      plan.bridleForward = Number(document.getElementById("bridleForward").value);
      plan.bridleLoop = Number(document.getElementById("bridleLoop").value);
      plan.chainOnBoard = Number(document.getElementById("chain").value);
      plan.clearance = Number(document.getElementById("clearance").value);
      plan.stayStart = document.getElementById("stayStart").value.slice(0, 5);
      plan.mooringField = document.getElementById("mooring").checked;
      plan.scopeTarget = Number(document.querySelector("input[name=scope]:checked").value);
      plan.extremes = [0, 1, 2, 3].map(function (index) {
        return {
          time: document.getElementById("t" + index).value.slice(0, 5),
          height: Number(document.getElementById("h" + index).value),
        };
      });
    }

    function writePlan() {
      document.getElementById("chartDepth").value = plan.chartDepth;
      document.getElementById("freeboard").value = plan.freeboard;
      document.getElementById("loa").value = plan.loa;
      document.getElementById("draft").value = plan.draft;
      document.getElementById("bridleForward").value = plan.bridleForward;
      document.getElementById("bridleLoop").value = plan.bridleLoop;
      document.getElementById("chain").value = plan.chainOnBoard;
      document.getElementById("clearance").value = plan.clearance;
      document.getElementById("stayStart").value = plan.stayStart;
      document.getElementById("mooring").checked = plan.mooringField;
      document.querySelectorAll("input[name=scope]").forEach(function (input) {
        input.checked = Number(input.value) === Number(plan.scopeTarget);
      });
      plan.extremes.forEach(function (point, index) {
        document.getElementById("t" + index).value = point.time;
        document.getElementById("h" + index).value = point.height;
      });
    }

    function paintResult() {
      readPlan();
      var result = buildPlan(plan);
      var box = document.getElementById("result");
      if (!result.ok) {
        box.innerHTML = "<div class='banner bad'><h2>Check the inputs</h2><p>" + result.errors.map(esc).join("<br>") + "</p></div>";
        return;
      }
      var tideLine = polyline(result.samples, "tide", 0, Math.max.apply(null, result.samples.map(function (s) { return s.tide; })) + 0.2);
      var scopeMin = Math.min.apply(null, result.samples.map(function (s) { return s.scope; })) - 0.5;
      var scopeMax = Math.max.apply(null, result.samples.map(function (s) { return s.scope; })) + 0.5;
      var scopeLine = polyline(result.samples, "scope", scopeMin, scopeMax);
      var rows = result.hourly
        .map(function (row) {
          return "<tr><td>" + row.label + "</td><td>" + row.tide.toFixed(2) + "</td><td>" + row.vertical.toFixed(1) + "</td><td>" + row.scope.toFixed(2) + "</td><td>" + row.swingRatio.toFixed(2) + "</td><td>" + row.swingRadius.toFixed(1) + "</td></tr>";
        })
        .join("");
      var official = samePlan(plan);
      box.innerHTML =
        "<div class='banner " + (result.cleared ? "good" : "bad") + "'><h2>" + (result.cleared ? "Cleared to deploy" : "Not cleared") + "</h2><p>High water " +
        result.highTide.toFixed(2) + " m at " + result.highTime + ". Low water " + result.lowTide.toFixed(2) + " m at " + result.lowTime + ".</p>" +
        (result.reasons.length ? "<p>" + result.reasons.map(esc).join("</p><p>") + "</p>" : "<p>Scope holds at high water and the low-water circle fits.</p>") +
        "</div><div class='grid two' style='margin-top:0.75rem'>" +
        stat("Scope at high water", ratioText(result.scopeAtHigh)) +
        stat("Swing ratio at low water", ratioText(result.swingRatioAtLow)) +
        stat("Working rode", metres(result.workingRode)) +
        stat("Total off the gypsy", metres(result.totalVeer)) +
        stat("Swing radius, low water", metres(result.swingAtLow)) +
        stat("Under-keel at low water", metres(result.underKeel)) +
        "</div><p class='muted'>Ignoring tide and roller leaves a high-water scope of " + ratioText(result.naiveScope) + ". Pull angle at high water " + result.pull.toFixed(1) + "°.</p>" +
        "<p>Tide</p><svg class='chart' viewBox='0 0 640 180'><polyline fill='none' stroke='#d4a24a' stroke-width='3' points='" + tideLine + "'/></svg>" +
        "<p>Scope</p><svg class='chart' viewBox='0 0 640 180'><polyline fill='none' stroke='#e7f0ea' stroke-width='3' points='" + scopeLine + "'/></svg>" +
        "<div class='scroll'><table><thead><tr><th>Time</th><th>Tide</th><th>Roller</th><th>Scope</th><th>Swing ratio</th><th>Radius</th></tr></thead><tbody>" +
        rows + "</tbody></table></div>" +
        "<p style='margin-top:0.8rem'>" + (official ? "This is the assessment anchorage." : "Practice only. Load the assessment anchorage to record a pass.") + "</p>" +
        (official && result.cleared ? "<button class='primary' id='record' type='button'" + (deployCleared ? " disabled" : "") + ">" + (deployCleared ? "Deployment recorded" : "Record this deployment") + "</button>" : "");
      var record = document.getElementById("record");
      if (record) {
        record.onclick = function () {
          deployCleared = true;
          persist();
          paintResult();
          paintRecord();
        };
      }
    }

    function stat(label, value) {
      return "<div class='card'><div class='muted'>" + esc(label) + "</div><div class='title'>" + esc(value) + "</div></div>";
    }

    function paintQuiz() {
      var question = QUESTIONS[qIndex];
      var chosen = answers[qIndex];
      var locked = chosen !== null && chosen !== undefined;
      var html = "<p class='muted'>Question " + (qIndex + 1) + " of " + QUESTIONS.length + "</p><h1>Check the decision</h1><p>" + esc(question.stem) + "</p>";
      question.choices.forEach(function (choice, index) {
        var cls = "choice";
        if (locked && index === question.answer) cls += " right";
        if (locked && index === chosen && chosen !== question.answer) cls += " wrong";
        html += "<button class='" + cls + "' data-choice='" + index + "' type='button'" + (locked ? " disabled" : "") + ">" + esc(choice) + "</button>";
      });
      if (locked) html += "<p class='muted'>" + esc(question.why) + "</p>";
      html += "<div class='rowbtns'><button class='ghost' type='button' id='qprev'" + (qIndex === 0 ? " disabled" : "") + ">Previous</button>";
      if (locked && qIndex < QUESTIONS.length - 1) html += "<button class='primary' type='button' id='qnext'>Next question</button>";
      if (locked && qIndex === QUESTIONS.length - 1) html += "<button class='primary' type='button' id='qdone'>Score and open the record</button>";
      html += "</div>";
      var box = document.getElementById("quiz");
      box.innerHTML = html;
      box.querySelectorAll("[data-choice]").forEach(function (button) {
        button.onclick = function () {
          if (answers[qIndex] !== null && answers[qIndex] !== undefined) return;
          answers[qIndex] = Number(button.getAttribute("data-choice"));
          persist();
          paintQuiz();
        };
      });
      var prev = document.getElementById("qprev");
      if (prev) prev.onclick = function () { qIndex -= 1; paintQuiz(); };
      var next = document.getElementById("qnext");
      if (next) next.onclick = function () { qIndex += 1; paintQuiz(); };
      var done = document.getElementById("qdone");
      if (done) done.onclick = function () { show(7); };
    }

    function paintRecord() {
      var sitting = score();
      var passed = best !== null && best >= MASTERY && deployCleared;
      document.getElementById("record-body").innerHTML =
        "<h1>" + (passed ? "Recorded as passed" : "Not passed yet") + "</h1>" +
        "<p class='muted'>A pass is 80% and a cleared assessment deployment. Both are written to the SCORM 1.2 record.</p>" +
        "<div class='grid two'><div class='card'><div class='muted'>Best quiz score</div><div class='title'>" + (best === null ? "Not scored" : best + "%") + "</div></div>" +
        "<div class='card'><div class='muted'>24-hour deployment</div><div class='title'>" + (deployCleared ? "Cleared" : "Not recorded") + "</div></div></div>" +
        "<p>Latest sitting: " + (sitting.complete ? sitting.correct + " of 10" : "unfinished") + ".</p>" +
        "<p class='muted'>" + (lms ? "Talking to the LMS API." : "No LMS API above this page. A local SCORM 1.2 shim is storing the attempt. In an LMS these same calls hit the real API.") + "</p>" +
        "<div class='scroll'><table><tbody>" +
        ["cmi.core.student_name", "cmi.core.lesson_status", "cmi.core.score.raw", "cmi.core.score.min", "cmi.core.score.max", "cmi.core.lesson_location", "cmi.core.session_time", "cmi.suspend_data"]
          .map(function (key) {
            return "<tr><th>" + key + "</th><td>" + esc(api.LMSGetValue(key) || "—") + "</td></tr>";
          })
          .join("") +
        "</tbody></table></div>" +
        "<div class='rowbtns' style='margin-top:0.8rem'><button class='ghost' type='button' id='reset'>Reset this attempt</button></div>";
      document.getElementById("reset").onclick = function () {
        answers = QUESTIONS.map(function () { return null; });
        qIndex = 0;
        deployCleared = false;
        best = null;
        step = 0;
        persist();
        show(0);
      };
    }

    function show(next) {
      step = next;
      document.querySelectorAll("[data-step]").forEach(function (section) {
        section.hidden = Number(section.getAttribute("data-step")) !== step;
      });
      document.querySelectorAll("#chips button").forEach(function (button, index) {
        if (index === step) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
      document.getElementById("back").disabled = step === 0;
      document.getElementById("next").hidden = step === 6 || step === 7;
      document.getElementById("nav").hidden = step === 6;
      if (step === 4) paintResult();
      if (step === 6) paintQuiz();
      persist();
      if (step === 7) paintRecord();
      root.scrollTo(0, 0);
    }

    document.getElementById("chips").innerHTML = steps
      .map(function (label, index) {
        return "<button type='button' data-goto='" + index + "'>" + label + "</button>";
      })
      .join("");
    document.getElementById("chips").onclick = function (event) {
      var button = event.target.closest("button");
      if (!button) return;
      show(Number(button.getAttribute("data-goto")));
    };
    document.getElementById("back").onclick = function () { show(Math.max(0, step - 1)); };
    document.getElementById("next").onclick = function () { show(Math.min(7, step + 1)); };
    document.getElementById("calc").addEventListener("input", function () {
      if (step === 4) paintResult();
    });
    document.getElementById("load-assessment").onclick = function () {
      plan = clone(ASSESSMENT);
      writePlan();
      paintResult();
    };
    document.getElementById("load-trap").onclick = function () {
      plan = clone(ASSESSMENT);
      plan.clearance = 60;
      writePlan();
      paintResult();
    };
    writePlan();
    show(Math.max(0, Math.min(7, step)));
    root.addEventListener("pagehide", function () {
      api.LMSFinish("");
    });
  }

  root.HWS = { buildPlan: buildPlan, ASSESSMENT: ASSESSMENT, QUESTIONS: QUESTIONS, boot: boot };
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
