import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CartesianGrid, c as Tooltip, i as Line, n as YAxis, o as ReferenceLine, r as XAxis, s as ResponsiveContainer, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CXnED50n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fieldClass = "h-11 w-full min-w-0 rounded-md border border-line bg-bg px-3 text-base text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass";
var primaryClass = "inline-flex h-11 items-center justify-center rounded-md bg-brass px-4 text-sm font-medium text-brass-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-40";
var ghostClass = "inline-flex h-11 items-center justify-center rounded-md border border-line bg-surface px-4 text-sm font-medium text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-40";
var FILM$1 = {
	title: "Catamaran Manoeuvring Tips & Leaving a Marina",
	series: "Docking Part 1",
	maker: "TMG Yachts Australia",
	channel: "TMG Yachts",
	instructor: "Joe Fox",
	boat: "Lagoon 42",
	watch: "https://youtu.be/wagOy9IpjMY",
	embed: "https://www.youtube-nocookie.com/embed/wagOy9IpjMY",
	site: "https://tmgyachts.com/"
};
var STEPS$1 = [
	{
		id: "film",
		short: "Film",
		title: "The film"
	},
	{
		id: "wind",
		short: "Wind",
		title: "Wind decides the end"
	},
	{
		id: "astern",
		short: "Astern",
		title: "Both engines, wheel locked"
	},
	{
		id: "quiz",
		short: "Quiz",
		title: "Quiz"
	},
	{
		id: "result",
		short: "Result",
		title: "Result"
	}
];
var QUESTIONS$1 = [
	{
		id: "end",
		stem: "You are committing to a mooring. The wind has already chosen which end of the boat should arrive first. Which end?",
		choices: [
			"The stern. Put the rear to the wind and back up onto the pickup.",
			"The bow, head to wind, the same way you set an anchor.",
			"The beam, so a gust lays a hull against the buoy.",
			"Whichever end is closer when you enter the bay."
		],
		answer: 0,
		why: "This approach is not the anchoring setup. Rear to the wind: the stern points into the wind, and you reverse onto the mooring. Head to wind is how you drop the hook, not how you come onto the buoy."
	},
	{
		id: "off-dock",
		stem: "The wind is blowing off the pontoon, out into the fairway. You want that face. How do you come in?",
		choices: [
			"Stern toward the pontoon — that is stern to the wind — both engines in reverse, steering locked.",
			"Bow toward the pontoon in ahead, wheel free, so you can steer the last metres.",
			"Both engines in neutral and let the wind blow you off while you throw a bow line.",
			"Opposite throttles until a fender touches, then both ahead into the dock."
		],
		answer: 0,
		why: "Wind off the dock means the wind is coming from the pontoon. Stern to the wind points the stern at that face. Reverse with both engines. Ease them and the wind blows you back off — that is the abort. Bow-on would be head to wind."
	},
	{
		id: "onto-dock",
		stem: "A 15–20 knot wind is blowing you onto the pontoon and you are still bow-on to that face. What does the wind change?",
		choices: [
			"Do not finish bow-first. Go round until the stern is to the wind, then reverse in on both engines with the wheel locked.",
			"Add ahead throttle so you arrive before the gust owns the bow.",
			"Leave the wheel free and correct each yaw with helm while one engine is astern.",
			"Come in beam-on and let the wind lay you on the pontoon."
		],
		answer: 0,
		why: "Wind onto the dock is the case the film flags on the way out: both engines ahead will drag the stern along the pontoon unless you have angle. Coming in, bow-first is downwind. The decision is still stern to the wind. If you cannot get that geometry, you are not set up."
	},
	{
		id: "both",
		stem: "The stern is to the wind and you are on the final approach to the dock. What are the throttles doing?",
		choices: [
			"Both in reverse, revs matched, so the boat creeps stern-first without a yaw.",
			"Port ahead and starboard astern — the spin Joe uses to pivot off a fender.",
			"One engine in reverse and the other stopped, so you do not fight the wheel.",
			"Both ahead, then a hard turn as the stern reaches the dock."
		],
		answer: 0,
		why: "Reverse with both engines. Opposite throttles are the film’s spin: useful to pivot in a tight marina, wrong for this approach. One engine astern pulls that quarter back and twists you off the line."
	},
	{
		id: "lock",
		stem: "Why lock the steering off before those engines go astern?",
		choices: [
			"Propeller thrust washes the rudders. Free, they twist off centre and the boat yaws even though the throttles match.",
			"A locked wheel hands the approach to the autopilot.",
			"Locking the wheel is what stops the boat alongside.",
			"Rudders do nothing in reverse, so the lock is optional."
		],
		answer: 0,
		why: "Lock the steering off so rudder twist from propeller thrust cannot pull you off the line. In reverse the wash hits the rudders from behind. If the wheel is free they are thrown over. Amidships and locked, only the throttles steer."
	},
	{
		id: "yaw",
		stem: "Both throttles are matched in reverse and the stern still walks off the mooring. What do you check first?",
		choices: [
			"That the wheel is still locked. Do not add helm to fight a rudder the prop wash has already twisted.",
			"That one engine has been put ahead, because a yaw means you should be spinning.",
			"That the bow has come head to wind — if it has, keep going.",
			"Nothing. A yaw in reverse is normal and the buoy will stop it."
		],
		answer: 0,
		why: "Matched reverse tracks straight only while the rudders stay locked amidships. An unlocked wheel lets propeller thrust twist them, and the stern walks off. Lock it off again. Opposite engines would be a deliberate spin, not a correction."
	}
];
function scoreAnswers$1(answers) {
	const total = QUESTIONS$1.length;
	const complete = answers.length >= total && answers.slice(0, total).every((answer) => answer !== null);
	const correct = QUESTIONS$1.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0);
	return {
		correct,
		total,
		percent: Math.round(correct / total * 100),
		complete
	};
}
var STORAGE_KEY$1 = "allsail-stern-to-wind";
function empty() {
	return {
		step: 0,
		answers: Array(QUESTIONS$1.length).fill(null),
		qIndex: 0,
		bestScore: null
	};
}
function load() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY$1);
		if (!raw) return empty();
		const parsed = JSON.parse(raw);
		const answers = Array.isArray(parsed.answers) ? parsed.answers.slice(0, QUESTIONS$1.length) : [];
		while (answers.length < QUESTIONS$1.length) answers.push(null);
		return {
			step: typeof parsed.step === "number" ? Math.min(Math.max(0, parsed.step), STEPS$1.length - 1) : 0,
			answers,
			qIndex: typeof parsed.qIndex === "number" ? Math.min(Math.max(0, parsed.qIndex), QUESTIONS$1.length - 1) : 0,
			bestScore: typeof parsed.bestScore === "number" ? parsed.bestScore : null
		};
	} catch {
		return empty();
	}
}
function Rule$1({ index, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-serif text-xl text-brass",
			children: index
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children
		})] })]
	});
}
function ApproachCourse() {
	const [state, setState] = (0, import_react.useState)(empty);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setState(load());
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(STORAGE_KEY$1, JSON.stringify(state));
	}, [ready, state]);
	const score = scoreAnswers$1(state.answers);
	const passed = (state.bestScore ?? 0) >= 80;
	const go = (step) => setState((current) => ({
		...current,
		step
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3",
				children: STEPS$1.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-current": index === state.step ? "step" : void 0,
					className: `h-11 shrink-0 rounded-full px-3 text-sm ${index === state.step ? "bg-brass text-brass-ink" : "text-muted"}`,
					onClick: () => go(index),
					children: step.short
				}, step.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-4 pb-28 pt-6",
			children: [
				state.step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmLesson, {}) : null,
				state.step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindLesson, {}) : null,
				state.step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsternLesson, {}) : null,
				state.step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, {
					answers: state.answers,
					index: state.qIndex,
					onAnswer: (choice) => {
						if (state.answers[state.qIndex] !== null) return;
						const answers = state.answers.slice();
						answers[state.qIndex] = choice;
						const nextScore = scoreAnswers$1(answers);
						const sitting = nextScore.complete ? nextScore.percent : null;
						const bestScore = sitting === null ? state.bestScore : Math.max(state.bestScore ?? sitting, sitting);
						setState({
							...state,
							answers,
							bestScore
						});
					},
					onIndex: (qIndex) => setState({
						...state,
						qIndex
					}),
					onDone: () => go(4)
				}) : null,
				state.step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result$1, {
					percent: state.bestScore,
					complete: score.complete,
					correct: score.correct,
					passed,
					missed: QUESTIONS$1.map((question, index) => ({
						question,
						chosen: state.answers[index]
					})).filter((item) => item.chosen !== null && item.chosen !== item.question.answer),
					onRetry: () => setState({
						...state,
						step: 3,
						qIndex: 0,
						answers: Array(QUESTIONS$1.length).fill(null)
					}),
					onQuiz: () => go(3)
				}) : null
			]
		}),
		state.step !== 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "fixed inset-x-0 bottom-0 border-t border-line bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl gap-2 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${ghostClass} flex-1`,
					disabled: state.step === 0,
					onClick: () => go(state.step - 1),
					children: "Back"
				}), state.step < STEPS$1.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${primaryClass} flex-1`,
					onClick: () => go(state.step + 1),
					children: "Continue"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${primaryClass} flex-1`,
					onClick: () => go(0),
					children: "Replay the film"
				})]
			})
		}) : null
	] });
}
function FilmPoster() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const title = "TMG’s Lagoon 42 anchoring lesson";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden border border-line bg-fg",
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			className: "aspect-video w-full",
			src: "https://www.youtube-nocookie.com/embed/i_SqmhP4hPU?autoplay=1",
			title,
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; compute-pressure",
			referrerPolicy: "strict-origin-when-cross-origin",
			allowFullScreen: true
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen(true),
			className: "flex aspect-video w-full flex-col justify-between bg-fg p-5 text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs tracking-widest text-brass",
					children: "TMG YACHTS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-2xl leading-tight text-bg sm:text-3xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex h-11 w-fit items-center bg-brass px-4 text-sm font-medium text-brass-ink",
					children: "Play"
				})
			]
		})
	});
}
function FilmLesson() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-3xl leading-tight",
				children: "Stern to the wind."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					"Follow-on from High Water Scope. Same kind of boat, next decision: the wind chooses how you approach a mooring or come into a dock. Credit ",
					FILM$1.maker,
					". ",
					FILM$1.instructor,
					" on a ",
					FILM$1.boat,
					", in ",
					FILM$1.channel,
					"’s film",
					" ",
					FILM$1.title,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "In the film he locks the wheel and forgets it. The marina is driven on the two throttles, like tracks. He also shows why wind changes the angle: a 15–20 knot wind blowing him onto the dock means both engines ahead will drag the stern down the pontoon unless he takes a proper angle off. This module is the decision on the way back in." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule$1, {
					index: "01",
					title: "Rear to the wind",
					children: "Present the stern to the wind. You back onto the mooring or the dock. You do not arrive head to wind the way you do when you anchor."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule$1, {
					index: "02",
					title: "Reverse with both engines",
					children: "Once the stern is to the wind, both throttles astern, revs matched. One ahead and one astern is a spin, not an approach."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule$1, {
					index: "03",
					title: "Lock the steering off",
					children: "Propeller thrust in reverse washes the rudders and will twist them if the wheel is free. Locked off, the rudders stay amidships and the throttles are the only steer."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmPoster, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Play it in the player. AllSail embeds this film with YouTube’s player and does not download or rehost it.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-brass underline decoration-line underline-offset-4",
						href: FILM$1.watch,
						children: "Watch on YouTube"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " · " }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-brass underline decoration-line underline-offset-4",
						href: FILM$1.site,
						children: FILM$1.maker
					})
				]
			})
		]
	});
}
function WindLesson() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl leading-tight",
				children: "The wind picks the end that arrives"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Look at where the wind is coming from before you shape up. Stern to the wind means the stern points at the wind, and the last metres are astern, toward whatever you are coming onto."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-brass bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Wind blowing off the dock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-medium",
							children: "Stern toward the pontoon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "The wind’s source is the dock. Rear to the wind points the stern at that face. Both engines reverse you in. Come to neutral and the wind blows you back off. That abort only exists if you came in this way."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Wind blowing you onto the dock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-medium",
							children: "Do not finish bow-first"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Bow-on is downwind. The stern is not to the wind, and both engines ahead is how the film’s stern gets dragged along the pontoon. Go round. Only reverse in once the stern is to the wind. If you cannot get that geometry, you are not set up."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-line bg-surface-2 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Mooring buoy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: "The pickup is upwind of you. Stern points at the buoy and at the wind. Back up to it. Do not approach head to wind and then try to turn the stern in at the last moment — that is when the bows’ windage takes the boat off the line you chose."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Anchoring in the previous module is the other end of the boat: head to wind, chain going out, bridle after the hook is set. Do not reuse that picture for a mooring or a dock."
			})
		]
	});
}
function AsternLesson() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl leading-tight",
				children: "Both astern. Wheel locked."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					FILM$1.instructor,
					" locks the wheel on the ",
					FILM$1.boat,
					" so the helm drops out of the problem. On the way in, that lock does a second job: it stops propeller thrust from twisting the rudders."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule$1, {
					index: "01",
					title: "Match the revs",
					children: "Both engines in reverse, same revs. The hulls are far apart. Unequal astern pulls one quarter back and the stern walks off the mooring or down the dock."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule$1, {
					index: "02",
					title: "Do not borrow the spin",
					children: "Port ahead and starboard astern, revs matched, is how he pivots on a stern fender and how he turns in a tight fairway. That pair of throttles is a turn. The approach is both astern."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule$1, {
					index: "03",
					title: "Lock steering off before you go astern",
					children: "Reverse wash travels forward onto the rudders. A free wheel gets thrown hard over. The boat yaws while the throttles still look even. Lock the wheel amidships first, then the throttles."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule$1, {
					index: "04",
					title: "A yaw is a check, not more helm",
					children: "If the stern walks off with the throttles matched, look at the wheel before you touch it. Unlocking it to “correct” feeds the twist. Lock it off, rematch the revs, and if the line is gone, go round rather than powering out of it alongside."
				})
			] })
		]
	});
}
function Quiz({ answers, index, onAnswer, onIndex, onDone }) {
	const question = QUESTIONS$1[index];
	const chosen = answers[index];
	const locked = chosen !== null;
	const correct = chosen === question.answer;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				"Question ",
				index + 1,
				" of ",
				QUESTIONS$1.length
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-serif text-3xl leading-tight",
			children: "Wind first. Then the throttles."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: question.stem
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "radiogroup",
			"aria-label": `Question ${index + 1}`,
			className: "mt-4 space-y-2",
			children: question.choices.map((choice, choiceIndex) => {
				const selected = chosen === choiceIndex;
				const showRight = locked && choiceIndex === question.answer;
				const showWrong = locked && selected && !correct;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "radio",
					"aria-checked": selected,
					disabled: locked,
					onClick: () => onAnswer(choiceIndex),
					className: `block min-h-11 w-full rounded-md border px-3 py-3 text-left text-sm disabled:opacity-100 ${showRight ? "border-brass" : showWrong ? "border-fail" : "border-line"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-2 text-muted",
							children: String.fromCharCode(65 + choiceIndex)
						}),
						choice,
						showRight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-xs text-brass",
							children: "This is the safe answer"
						}) : null,
						showWrong ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-xs text-fail",
							children: "Not this one"
						}) : null
					]
				}, choice);
			})
		}),
		locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: question.why
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ghostClass,
					disabled: index === 0,
					onClick: () => onIndex(index - 1),
					children: "Previous"
				}),
				locked && index < QUESTIONS$1.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: primaryClass,
					onClick: () => onIndex(index + 1),
					children: "Next question"
				}) : null,
				locked && index === QUESTIONS$1.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: primaryClass,
					onClick: onDone,
					children: "Score"
				}) : null
			]
		})
	] });
}
function Result$1({ percent, complete, correct, passed, missed, onRetry, onQuiz }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl leading-tight",
				children: passed ? "Approach passed" : "Not passed yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					"A pass is ",
					80,
					"% on the six wind decisions. The rule is the same in every stem: stern to the wind, both engines in reverse, steering locked off."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Best score"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-serif text-2xl",
						children: complete && percent !== null ? `${percent}%` : "Not scored"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: complete ? `${correct} of ${QUESTIONS$1.length} on the latest sitting` : "Answer all six"
					})
				]
			}),
			!complete || percent !== null && percent < 80 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: ghostClass,
				onClick: complete ? onRetry : onQuiz,
				children: complete ? "Retry the quiz" : "Open the quiz"
			}) : null,
			missed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "Missed"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-3",
				children: missed.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-md border border-line p-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.question.stem }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: item.question.why
					})]
				}, item.question.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Film credited to ",
					FILM$1.maker,
					". ",
					FILM$1.instructor,
					", ",
					FILM$1.boat,
					". ",
					FILM$1.series,
					". The picture stays on YouTube."
				]
			})
		]
	});
}
var KEEL_MARGIN = .5;
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
		{
			time: "03:10",
			height: .3
		},
		{
			time: "09:25",
			height: 1.9
		},
		{
			time: "15:40",
			height: .4
		},
		{
			time: "21:55",
			height: 1.7
		}
	]
};
var SWING_TRAP = {
	...ASSESSMENT,
	clearance: 60,
	extremes: ASSESSMENT.extremes.map((point) => ({ ...point }))
};
function clonePlan(plan) {
	return {
		...plan,
		extremes: plan.extremes.map((point) => ({ ...point }))
	};
}
function parseClock(value) {
	const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
	if (!match) return null;
	const hour = Number(match[1]);
	const minute = Number(match[2]);
	if (hour > 23 || minute > 59) return null;
	return hour * 60 + minute;
}
function formatClock(minutes) {
	const wrapped = (Math.round(minutes) % 1440 + 1440) % 1440;
	const hour = Math.floor(wrapped / 60);
	const minute = wrapped % 60;
	return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
function metres(value, digits = 1) {
	if (!Number.isFinite(value)) return "—";
	return `${value.toFixed(digits)} m`;
}
function ratioText(value) {
	if (!Number.isFinite(value)) return "—";
	return `${value.toFixed(2)}:1`;
}
function clockDuration(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) return "—";
	const total = Math.round(seconds);
	const min = Math.floor(total / 60);
	const sec = total % 60;
	return `${min} min ${String(sec).padStart(2, "0")} s`;
}
function tideHeight(atMin, extremes) {
	if (extremes.length === 0) return 0;
	if (extremes.length === 1) return extremes[0].height;
	const span = 1440;
	const points = [];
	for (const shift of [
		-1440,
		0,
		span,
		span * 2
	]) for (const extreme of extremes) points.push({
		min: extreme.min + shift,
		height: extreme.height
	});
	points.sort((a, b) => a.min - b.min);
	let t = atMin;
	while (t < points[0].min) t += span;
	while (t > points[points.length - 1].min) t -= span;
	for (let i = 0; i < points.length - 1; i++) {
		const left = points[i];
		const right = points[i + 1];
		if (t >= left.min && t <= right.min) {
			const spanMin = right.min - left.min || 1;
			const u = (t - left.min) / spanMin;
			return left.height + (right.height - left.height) * (1 - Math.cos(Math.PI * u)) / 2;
		}
	}
	return points[points.length - 1].height;
}
function windowTide(startMin, extremes) {
	const end = startMin + 1440;
	let maxH = tideHeight(startMin, extremes);
	let minH = maxH;
	let maxAt = startMin;
	let minAt = startMin;
	const consider = (t) => {
		const height = tideHeight(t, extremes);
		if (height > maxH) {
			maxH = height;
			maxAt = t;
		}
		if (height < minH) {
			minH = height;
			minAt = t;
		}
	};
	consider(end);
	for (const extreme of extremes) for (const shift of [
		-1440,
		0,
		1440,
		2880
	]) {
		const t = extreme.min + shift;
		if (t >= startMin && t <= end) consider(t);
	}
	return {
		maxH,
		minH,
		maxAt,
		minAt
	};
}
function blank(errors) {
	const mark = {
		time: "—",
		tide: 0,
		vertical: 0
	};
	return {
		ok: false,
		errors,
		reasons: [],
		cleared: false,
		samples: [],
		hourly: [],
		high: mark,
		low: mark,
		workingRode: 0,
		totalVeer: 0,
		scopeAtHigh: 0,
		scopeAtLow: 0,
		swingRatioAtLow: 0,
		swingRatioAtHigh: 0,
		horizontalAtLow: 0,
		swingAtLow: 0,
		swingAtHigh: 0,
		pullAngleAtHigh: 0,
		underKeelLow: 0,
		waterLow: 0,
		naiveChartOnly: 0,
		naiveChartOnlyScope: 0,
		naiveNoTide: 0,
		naiveNoTideScope: 0,
		windlassSeconds: 0
	};
}
function buildPlan(input) {
	const errors = [];
	if (!Number.isFinite(input.chartDepth) || input.chartDepth <= 0) errors.push("Chart depth must be greater than zero.");
	if (!Number.isFinite(input.freeboard) || input.freeboard < 0) errors.push("Bow-roller height cannot be negative.");
	if (!Number.isFinite(input.loa) || input.loa <= 0) errors.push("Length overall must be greater than zero.");
	if (!Number.isFinite(input.draft) || input.draft <= 0) errors.push("Draft must be greater than zero.");
	if (!Number.isFinite(input.bridleForward) || input.bridleForward < 0) errors.push("Bridle reach cannot be negative.");
	if (!Number.isFinite(input.bridleLoop) || input.bridleLoop < 0) errors.push("Bridle loop cannot be negative.");
	if (!Number.isFinite(input.chainOnBoard) || input.chainOnBoard <= 0) errors.push("Chain on board must be greater than zero.");
	if (!Number.isFinite(input.clearance) || input.clearance <= 0) errors.push("Clearance to the nearest hazard must be greater than zero.");
	if (!Number.isFinite(input.scopeTarget) || input.scopeTarget < 4) errors.push("Scope target must be at least 4:1 for any stay that includes a tide.");
	const start = parseClock(input.stayStart);
	if (start === null) errors.push("Stay start must be a time like 16:00.");
	const extremes = [];
	const seen = /* @__PURE__ */ new Set();
	if (input.extremes.length < 2) errors.push("Enter at least two tide extremes.");
	for (const point of input.extremes) {
		const min = parseClock(point.time);
		if (min === null) {
			errors.push(`Tide time “${point.time || "blank"}” is not HH:MM.`);
			continue;
		}
		if (seen.has(min)) errors.push(`Two tides share ${point.time}.`);
		seen.add(min);
		if (!Number.isFinite(point.height)) errors.push(`Tide height at ${point.time} is not a number.`);
		extremes.push({
			min,
			height: point.height
		});
	}
	if (errors.length > 0 || start === null || extremes.length < 2) return blank(errors);
	const marks = windowTide(start, extremes);
	const verticalAt = (tide) => input.chartDepth + tide + input.freeboard;
	const dHigh = verticalAt(marks.maxH);
	const dLow = verticalAt(marks.minH);
	if (dHigh <= 0 || dLow <= 0) return blank(["Roller-to-seabed is not positive. Check chart depth, tide, and freeboard."]);
	const workingRode = input.scopeTarget * dHigh;
	const pointAt = (offsetMin) => {
		const tide = tideHeight(start + offsetMin, extremes);
		const vertical = verticalAt(tide);
		const horizontal = Math.sqrt(Math.max(0, workingRode * workingRode - vertical * vertical));
		const scope = workingRode / vertical;
		return {
			offsetMin,
			label: formatClock(start + offsetMin),
			tide,
			vertical,
			scope,
			swingRatio: horizontal / vertical,
			horizontal,
			swingRadius: horizontal + input.bridleForward + input.loa
		};
	};
	const samples = [];
	for (let offset = 0; offset <= 1440; offset += 15) samples.push(pointAt(offset));
	const hourly = [];
	for (let offset = 0; offset <= 1440; offset += 60) hourly.push(pointAt(offset));
	const highSample = pointAt(marks.maxAt - start);
	const lowSample = pointAt(marks.minAt - start);
	const waterLow = input.chartDepth + marks.minH;
	const underKeelLow = waterLow - input.draft;
	const totalVeer = workingRode + input.bridleLoop;
	const naiveChartOnly = input.scopeTarget * input.chartDepth;
	const naiveNoTide = input.scopeTarget * (input.chartDepth + input.freeboard);
	const reasons = [];
	if (input.mooringField) reasons.push("The drop is between mooring buoys. Their swing is small; yours is not. Do not anchor there.");
	if (totalVeer > input.chainOnBoard + .05) reasons.push(`The gypsy must veer ${metres(totalVeer)} (${metres(workingRode)} of working rode plus ${metres(input.bridleLoop)} of bridle loop) and only ${metres(input.chainOnBoard)} is on board.`);
	if (lowSample.swingRadius > input.clearance + .05) reasons.push(`Low-water swing radius is ${metres(lowSample.swingRadius)} and the nearest hazard is ${metres(input.clearance)} from the anchor.`);
	if (underKeelLow < .5) reasons.push(`Low water leaves ${metres(underKeelLow)} under the ${metres(input.draft)} draft. Keep at least ${metres(KEEL_MARGIN)}.`);
	return {
		ok: true,
		errors: [],
		reasons,
		cleared: reasons.length === 0,
		samples,
		hourly,
		high: {
			time: formatClock(marks.maxAt),
			tide: marks.maxH,
			vertical: dHigh
		},
		low: {
			time: formatClock(marks.minAt),
			tide: marks.minH,
			vertical: dLow
		},
		workingRode,
		totalVeer,
		scopeAtHigh: workingRode / dHigh,
		scopeAtLow: workingRode / dLow,
		swingRatioAtLow: lowSample.swingRatio,
		swingRatioAtHigh: highSample.swingRatio,
		horizontalAtLow: lowSample.horizontal,
		swingAtLow: lowSample.swingRadius,
		swingAtHigh: highSample.swingRadius,
		pullAngleAtHigh: Math.asin(Math.min(1, dHigh / workingRode)) * 180 / Math.PI,
		underKeelLow,
		waterLow,
		naiveChartOnly,
		naiveChartOnlyScope: naiveChartOnly / dHigh,
		naiveNoTide,
		naiveNoTideScope: naiveNoTide / dHigh,
		windlassSeconds: totalVeer * 2
	};
}
function isAssessment(input) {
	const same = (a, b) => Math.abs(a - b) < .001;
	if (!same(input.chartDepth, ASSESSMENT.chartDepth)) return false;
	if (!same(input.freeboard, ASSESSMENT.freeboard)) return false;
	if (!same(input.loa, ASSESSMENT.loa)) return false;
	if (!same(input.draft, ASSESSMENT.draft)) return false;
	if (!same(input.bridleForward, ASSESSMENT.bridleForward)) return false;
	if (!same(input.bridleLoop, ASSESSMENT.bridleLoop)) return false;
	if (!same(input.chainOnBoard, ASSESSMENT.chainOnBoard)) return false;
	if (!same(input.clearance, ASSESSMENT.clearance)) return false;
	if (!same(input.scopeTarget, ASSESSMENT.scopeTarget)) return false;
	if (input.stayStart !== ASSESSMENT.stayStart) return false;
	if (input.mooringField) return false;
	if (input.extremes.length !== ASSESSMENT.extremes.length) return false;
	return input.extremes.every((point, index) => point.time === ASSESSMENT.extremes[index].time && same(point.height, ASSESSMENT.extremes[index].height));
}
var PRESETS = [
	{
		ratio: 4,
		label: "4:1 light, attended"
	},
	{
		ratio: 5,
		label: "5:1 settled night"
	},
	{
		ratio: 7,
		label: "7:1 about 20 kn"
	},
	{
		ratio: 8,
		label: "8:1 exposed"
	}
];
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1 block text-sm text-fg",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs leading-snug text-muted",
				children: hint
			}) : null
		]
	});
}
function Calculator({ value, onChange, recorded, onRecord }) {
	const plan = buildPlan(value);
	const assessment = isAssessment(value);
	const [sounder, setSounder] = (0, import_react.useState)("5.2");
	const [offset, setOffset] = (0, import_react.useState)("0.4");
	const [tideNow, setTideNow] = (0, import_react.useState)("1.6");
	const [text, setText] = (0, import_react.useState)({});
	const patch = (partial) => {
		onChange({
			...value,
			...partial,
			extremes: (partial.extremes ?? value.extremes).map((point) => ({ ...point }))
		});
	};
	const load = (next) => {
		setText({});
		onChange(clonePlan(next));
	};
	const num = (key, current, apply) => ({
		value: text[key] ?? String(current),
		onChange: (event) => {
			const raw = event.target.value;
			if (!/^-?\d*\.?\d*$/.test(raw)) return;
			setText((prev) => ({
				...prev,
				[key]: raw
			}));
			const parsed = Number(raw);
			if (raw !== "" && raw !== "-" && raw !== "." && raw !== "-." && Number.isFinite(parsed)) apply(parsed);
		},
		onBlur: () => setText((prev) => {
			const next = { ...prev };
			delete next[key];
			return next;
		})
	});
	const applySounder = () => {
		const depth = Number(sounder) + Number(offset) - Number(tideNow);
		if (Number.isFinite(depth)) {
			setText((prev) => {
				const next = { ...prev };
				delete next.chartDepth;
				return next;
			});
			patch({ chartDepth: Math.round(depth * 100) / 100 });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl leading-tight",
				children: "The 24-hour chart"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Enter the highs and lows that cover the stay. The curve between them is a cosine, which is the shape of a tide. Scope is taken from the highest roller-depth in the window. Swing is taken from the lowest."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ghostClass,
					onClick: () => load(ASSESSMENT),
					children: "Assessment anchorage"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ghostClass,
					onClick: () => load(SWING_TRAP),
					children: "60 m swing trap"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Chart depth",
						hint: "Metres below chart datum, under the anchor.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "decimal",
							...num("chartDepth", value.chartDepth, (chartDepth) => patch({ chartDepth }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Bow roller above the water",
						hint: "Freeboard to the point the chain leaves the boat.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "decimal",
							...num("freeboard", value.freeboard, (freeboard) => patch({ freeboard }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Length overall",
						hint: "Lagoon 42 is 12.8 m. The stern is this far past the bow.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "decimal",
							...num("loa", value.loa, (loa) => patch({ loa }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Draft",
						hint: "Used only for under-keel at low water.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "decimal",
							...num("draft", value.draft, (draft) => patch({ draft }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Bridle reach forward",
						hint: "Joe’s 5–6 m shift of the centre of effort.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "decimal",
							...num("bridleForward", value.bridleForward, (bridleForward) => patch({ bridleForward }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Bridle loop to veer",
						hint: "Extra chain after the hook. Unloads the windlass. Not scope.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "decimal",
							...num("bridleLoop", value.bridleLoop, (bridleLoop) => patch({ bridleLoop }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Chain on board",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "decimal",
							...num("chainOnBoard", value.chainOnBoard, (chainOnBoard) => patch({ chainOnBoard }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Clearance from the anchor",
						hint: "To the nearest boat, shoal, or shore you must not enter.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "decimal",
							...num("clearance", value.clearance, (clearance) => patch({ clearance }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Stay starts",
						hint: "The window is this time, plus 24 hours.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							type: "time",
							value: value.stayStart,
							onChange: (event) => patch({ stayStart: event.target.value.slice(0, 5) })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "mb-2 text-sm text-fg",
					children: "Scope target"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: PRESETS.map((preset) => {
						const selected = value.scopeTarget === preset.ratio;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": selected,
							className: `${selected ? primaryClass : ghostClass} h-auto min-h-11 w-full whitespace-normal px-2 py-2 text-center`,
							onClick: () => patch({ scopeTarget: preset.ratio }),
							children: preset.label
						}, preset.ratio);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "The film’s light-air band starts at 3:1. A stay with a tide does not. Around 20 knots, use the top of his 5–7× band."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "mb-2 text-sm text-fg",
				children: "Low and high water on the chart"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: value.extremes.map((point, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: index % 2 === 0 ? "Low or high time" : "Next extreme",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							type: "time",
							value: point.time,
							onChange: (event) => {
								const extremes = value.extremes.map((item, itemIndex) => itemIndex === index ? {
									...item,
									time: event.target.value.slice(0, 5)
								} : { ...item });
								patch({ extremes });
							}
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Height above datum",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "decimal",
							...num(`tide-${index}`, point.height, (height) => {
								const extremes = value.extremes.map((item, itemIndex) => itemIndex === index ? {
									...item,
									height
								} : { ...item });
								patch({ extremes });
							})
						})
					})]
				}, index))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-3 rounded-md border border-line bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: "mt-1 size-5 accent-brass",
					checked: value.mooringField,
					onChange: (event) => patch({ mooringField: event.target.checked })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm",
					children: "I would be dropping between mooring buoys"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted",
					children: "That single fact blocks a pass. The film’s warning is that your circle meets boats that hardly move."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "rounded-md border border-line bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "cursor-pointer text-sm",
						children: "I have a sounder reading, not chart depth"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "Chart depth = sounder + transducer below the waterline − height of tide right now. Example: 5.2 + 0.4 − 1.6 = 4.0 m."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								inputMode: "decimal",
								"aria-label": "Sounder",
								value: sounder,
								onChange: (event) => setSounder(event.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								inputMode: "decimal",
								"aria-label": "Transducer offset",
								value: offset,
								onChange: (event) => setOffset(event.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								inputMode: "decimal",
								"aria-label": "Tide now",
								value: tideNow,
								onChange: (event) => setTideNow(event.target.value)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `${ghostClass} mt-3`,
						onClick: applySounder,
						children: "Use this chart depth"
					})
				]
			}),
			!plan.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md border border-fail p-4 text-sm text-fail",
				children: plan.errors.map((error) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }, error))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {
				plan,
				clearance: value.clearance,
				assessment,
				recorded,
				onRecord
			})
		]
	});
}
function Result({ plan, clearance, assessment, recorded, onRecord }) {
	const tideData = plan.samples.map((sample) => ({
		label: sample.label,
		tide: Number(sample.tide.toFixed(2))
	}));
	const scopeData = plan.samples.map((sample) => ({
		label: sample.label,
		scope: Number(sample.scope.toFixed(2)),
		swing: Number(sample.swingRadius.toFixed(1))
	}));
	const scopeMin = Math.min(...plan.samples.map((sample) => sample.scope));
	const scopeMax = Math.max(...plan.samples.map((sample) => sample.scope));
	const swingMax = Math.max(plan.swingAtLow, clearance);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `rounded-md border p-4 ${plan.cleared ? "border-brass" : "border-fail"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `font-serif text-2xl ${plan.cleared ? "text-brass" : "text-fail"}`,
						children: plan.cleared ? "Cleared to deploy" : "Not cleared"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							"High water in this stay is ",
							plan.high.tide.toFixed(2),
							" m at ",
							plan.high.time,
							". Low water is",
							" ",
							plan.low.tide.toFixed(2),
							" m at ",
							plan.low.time,
							". Scope is judged on the high. Swing is judged on the low."
						]
					}),
					plan.reasons.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: plan.reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: reason }, reason))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						children: "Working rode holds the target at high water, the low-water circle fits inside the clearance, the locker can spare the loop, and you are not in a mooring field."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Scope at high water",
						value: ratioText(plan.scopeAtHigh),
						note: `Roller depth ${metres(plan.high.vertical)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Swing ratio at low water",
						value: ratioText(plan.swingRatioAtLow),
						note: `Reach ${metres(plan.horizontalAtLow)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Working rode",
						value: metres(plan.workingRode),
						note: "Chain that counts as scope"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total off the gypsy",
						value: metres(plan.totalVeer),
						note: `Windlass time ${clockDuration(plan.windlassSeconds)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Swing radius, low water",
						value: metres(plan.swingAtLow),
						note: `High-water circle ${metres(plan.swingAtHigh)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Under-keel at low water",
						value: metres(plan.underKeelLow),
						note: `Water depth ${metres(plan.waterLow)}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "If you ignore tide and roller",
						value: metres(plan.naiveChartOnly),
						note: `${ratioText(plan.naiveChartOnlyScope)} when the tide is in`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Roller, but no tide rise",
						value: metres(plan.naiveNoTide),
						note: `${ratioText(plan.naiveNoTideScope)} at high water`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pull angle at high water",
						value: `${plan.pullAngleAtHigh.toFixed(1)}°`,
						note: "Off the seabed, straight-line rode"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwingSketch, {
				radius: plan.swingAtLow,
				clearance,
				safe: plan.swingAtLow <= clearance
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBlock, {
				title: "Tide through the stay",
				caption: "Height above chart datum. The decision uses the real high and low, not the nearest hour.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: tideData,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-line)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								interval: 15,
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								},
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								},
								tickLine: false,
								axisLine: false,
								width: 36,
								domain: [0, "auto"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, { unit: "m" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "tide",
								name: "Tide",
								stroke: "var(--color-brass)",
								strokeWidth: 2,
								dot: false,
								isAnimationActive: false
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBlock, {
				title: "Scope through the stay",
				caption: "It is allowed to be richer at low water. It is not allowed to fall below the target at high water.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: scopeData,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-line)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								interval: 15,
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								},
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								},
								tickLine: false,
								axisLine: false,
								width: 36,
								domain: [Math.floor(scopeMin - 1), Math.ceil(scopeMax + 1)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, { unit: ":1" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: plan.scopeAtHigh,
								stroke: "var(--color-muted)",
								strokeDasharray: "4 4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "scope",
								name: "Scope",
								stroke: "var(--color-fg)",
								strokeWidth: 2,
								dot: false,
								isAnimationActive: false
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBlock, {
				title: "Swing radius against clearance",
				caption: "The dashed line is the room you said you have. The circle has to stay under it at low water.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: scopeData,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-line)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								interval: 15,
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								},
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								},
								tickLine: false,
								axisLine: false,
								width: 40,
								domain: [0, Math.ceil(swingMax * 1.15)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, { unit: "m" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: clearance,
								stroke: "var(--color-muted)",
								strokeDasharray: "4 4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "swing",
								name: "Swing radius",
								stroke: "var(--color-brass)",
								strokeWidth: 2,
								dot: false,
								isAnimationActive: false
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-full overflow-x-auto rounded-md border border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[40rem] text-left text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
							className: "px-3 py-2 text-left text-xs text-muted",
							children: "Hourly look along the stay. Decision figures above use the true high and low on the curve."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "border-b border-line",
								children: [
									"Time",
									"Tide",
									"Roller depth",
									"Scope",
									"Swing ratio",
									"Swing radius"
								].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: heading
								}, heading))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: plan.hourly.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: row.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: row.tide.toFixed(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: row.vertical.toFixed(1)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: row.scope.toFixed(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: row.swingRatio.toFixed(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: row.swingRadius.toFixed(1)
								})
							]
						}, row.offsetMin)) })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: assessment ? "This is the assessment anchorage." : "This is practice. Load the assessment anchorage to record a pass."
					}),
					assessment && plan.cleared ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `${primaryClass} mt-3 w-full sm:w-auto`,
						onClick: onRecord,
						disabled: recorded,
						children: recorded ? "Deployment recorded" : "Record this deployment"
					}) : null,
					recorded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "Written into the SCORM suspend data as a cleared 24-hour plan."
					}) : null
				]
			})
		]
	});
}
function Stat({ label, value, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-surface px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-serif text-2xl leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: note
			})
		]
	});
}
function ChartBlock({ title, caption, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
		className: "mb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: caption
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-48 w-full min-w-0",
		children
	})] });
}
function Tip({ active, payload, label, unit }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-surface px-3 py-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: label }), payload.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted",
			children: [
				item.name,
				": ",
				item.value,
				" ",
				unit
			]
		}, item.name))]
	});
}
function SwingSketch({ radius, clearance, safe }) {
	const scale = 118 / Math.max(radius, clearance, 1);
	const swingR = radius * scale;
	const clearR = clearance * scale;
	const stroke = safe ? "var(--color-brass)" : "var(--color-fail)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
		className: "mb-2 text-sm",
		children: "Plan view from the anchor"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 320 250",
		className: "w-full",
		role: "img",
		"aria-label": `Swing radius ${metres(radius)} against clearance ${metres(clearance)}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "320",
				height: "250",
				fill: "var(--color-surface)",
				rx: "8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "160",
				cy: "128",
				r: clearR,
				fill: "none",
				stroke: "var(--color-muted)",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "160",
				cy: "128",
				r: swingR,
				fill: "none",
				stroke,
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "160",
				cy: "128",
				r: "3",
				fill: "var(--color-fg)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "160",
				y: "148",
				textAnchor: "middle",
				fill: "var(--color-muted)",
				fontSize: "11",
				children: "Anchor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "16",
				y: "22",
				fill: "var(--color-muted)",
				fontSize: "11",
				children: "Dashed: room you have"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: "16",
				y: "238",
				fill: stroke,
				fontSize: "11",
				children: [
					safe ? "Circle fits" : "Circle does not fit",
					" · ",
					metres(radius)
				]
			})
		]
	})] });
}
var FILM = {
	title: "How to Anchor and Set Up a Bridle on a Catamaran",
	maker: "TMG Yachts",
	instructor: "Joe Fox",
	boat: "Lagoon 42",
	url: "https://youtu.be/i_SqmhP4hPU",
	blog: "https://www.themultihullgroup.com/inspire-and-learn-how-to-anchor-and-set-up-bridle/"
};
var STEPS = [
	{
		id: "brief",
		short: "Brief",
		title: "Safety brief"
	},
	{
		id: "six",
		short: "Six",
		title: "Six components"
	},
	{
		id: "scope",
		short: "Scope",
		title: "High-water scope"
	},
	{
		id: "swing",
		short: "Swing",
		title: "Low-water swing"
	},
	{
		id: "chart",
		short: "Chart",
		title: "24-hour tide chart"
	},
	{
		id: "bridle",
		short: "Bridle",
		title: "Set and bridle"
	},
	{
		id: "quiz",
		short: "Quiz",
		title: "Quiz"
	},
	{
		id: "record",
		short: "Record",
		title: "SCORM record"
	}
];
function stepIndex(id) {
	const index = STEPS.findIndex((step) => step.id === id);
	return index < 0 ? 0 : index;
}
var plan$1 = buildPlan(ASSESSMENT);
function Rule({ index, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-serif text-xl text-brass",
			children: index
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children
		})] })]
	});
}
function BriefLesson() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-3xl leading-tight text-fg",
				children: "Scope the high. Swing the low."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					"Built from ",
					FILM.maker,
					"’s film of ",
					FILM.instructor,
					" anchoring a ",
					FILM.boat,
					". He shows the six parts of the job and the chain multiples he actually uses. He does not run a 24-hour tide. A deployment is not successful here until both of those numbers have been taken off the tide chart for the whole stay."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "text-brass underline decoration-line underline-offset-4",
					href: FILM.url,
					children: "Watch the film"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: " · "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "text-brass underline decoration-line underline-offset-4",
					href: FILM.blog,
					children: "Read TMG’s notes"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Scope ratio, checked at high water"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-2xl",
							children: "Rode ÷ roller depth"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Deepest moment of the next 24 hours. Add the bow roller. This is when a short scope lifts the anchor."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Swing ratio, checked at low water"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-2xl",
							children: "Reach ÷ roller depth"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Shallowest moment. The same chain reaches further across the bottom, and the stern is still a boat-length beyond that."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Passed means 80% on the quiz and a recorded plan for the assessment anchorage that clears both gates. The sample tides are a worked chart, not a forecast for any real harbour."
			})
		]
	});
}
function SixLesson() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-3xl leading-tight",
			children: "The six components in the film"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-muted",
			children: [
				"On the ",
				FILM.boat,
				" the draft is just over 1.2 m, so the bays he uses are shallow. Shallow water is exactly where a short scope fails first. The wind in the film is a light northerly. He still plans as if it could reach 25 knots."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
					index: "01",
					title: "The anchor",
					children: "Nothing else in the list matters if the hook on the roller is the wrong gear, fouled, or not over the edge before you commit."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
					index: "02",
					title: "Wind and tidal flow",
					children: "They decide which way you will lie, and the tide chart decides how much water you will have later. He anchors head to wind."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
					index: "03",
					title: "How much chain",
					children: "Light and benign: 3–4× depth. Around 20 knots: 5–7×. More chain holds only if the anchor has been set."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
					index: "04",
					title: "Setting it",
					children: "Reverse until the chain is tight at a shallow angle. Ease off. The boat should spring back. Then a transit on two fixed marks — not a moving animal, not another boat."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
					index: "05",
					title: "The bridle",
					children: "Two lines, one hook, load shared between the hulls. Centre of effort moves about 5–6 m forward, which damps the horsing a catamaran does around a single bow roller."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
					index: "06",
					title: "Communication and maneuvering",
					children: "Bow and helm are about 8 m apart. Agree the plan and the hand signals before you enter. Short-handed, he primes the anchor on the bow and runs the remote from the helm."
				})
			]
		})
	] });
}
function ScopeLesson() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl leading-tight",
				children: "The multiple is applied at high water"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Scope is rode length divided by the distance from the bow roller to the seabed. The film’s multiples are right. The depth they multiply is not the number on the sounder at the moment you drop."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-md border border-line bg-surface-2 px-4 py-3 font-medium text-brass",
				children: [
					"D(t) = chart depth + tide(t) + freeboard",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Working rode L = scope target × the largest D in the 24-hour stay"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Freeboard is in the sum because the chain leaves the roller, not the waterline. A comment on the film makes the same point: 4 m of water and 1 m of roller is a 5 m drop, not a 4 m drop." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-line p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Chart depth only"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-serif text-2xl",
								children: metres(plan$1.naiveChartOnly)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-fail",
								children: [
									"Becomes ",
									ratioText(plan$1.naiveChartOnlyScope),
									" at high water"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-line p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Add the roller, ignore the tide"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-serif text-2xl",
								children: metres(plan$1.naiveNoTide)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-fail",
								children: [
									"Becomes ",
									ratioText(plan$1.naiveNoTideScope),
									" at high water"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-brass p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "High water of the stay"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-serif text-2xl",
								children: metres(plan$1.workingRode)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-brass",
								children: ["Holds ", ratioText(plan$1.scopeAtHigh)]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Assessment chart: 4.0 m below datum, roller 1.2 m, highest tide in the stay ",
					plan$1.high.tide.toFixed(1),
					" m at",
					" ",
					plan$1.high.time,
					". Roller-to-seabed ",
					metres(plan$1.high.vertical),
					". At 7:1, for about 20 knots, that is",
					" ",
					metres(plan$1.workingRode),
					" of working chain. The pull angle off the seabed is ",
					plan$1.pullAngleAtHigh.toFixed(1),
					"°. At 3:1 that angle is about 19°, which is why a light-air minimum is not an overnight plan once the tide has a say."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"After the hook is on, veer another ",
				metres(ASSESSMENT.bridleLoop),
				" so the bridle takes the load. That loop is not scope. Total off the gypsy: ",
				metres(plan$1.totalVeer),
				"."
			] })
		]
	});
}
function SwingLesson() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl leading-tight",
				children: "The circle is largest at low water"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "For a taut rode the horizontal reach is the other side of the same triangle. Divide that reach by the roller-depth and you have the swing ratio. It is fixed by the scope you actually have at that moment:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-md border border-line bg-surface-2 px-4 py-3 font-medium text-brass",
				children: [
					"Swing ratio W = √(scope² − 1)",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Swing radius = √(L² − D²) + bridle reach + length overall"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"D is smallest at low water, so W and the radius are largest then. On the assessment stay the low is",
				" ",
				plan$1.low.tide.toFixed(1),
				" m at ",
				plan$1.low.time,
				". Roller-depth ",
				metres(plan$1.low.vertical),
				". Scope there opens out to ",
				ratioText(plan$1.scopeAtLow),
				", swing ratio ",
				ratioText(plan$1.swingRatioAtLow),
				", radius",
				" ",
				metres(plan$1.swingAtLow),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"At high water the same chain is a smaller circle, ",
				metres(plan$1.swingAtHigh),
				". Clearing the high-water circle and then going to sleep is how you meet the boat that was “just outside” you at dusk."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "The bridle damps yaw. Joe moves the centre of effort 5–6 m forward. That distance is added to the radius because the stern is that far beyond the chain’s reach. It does not cancel the circle. Do not anchor between mooring buoys: they barely swing, and you do."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Under-keel is the other low-water check. Water depth at the low is ",
				metres(plan$1.waterLow),
				". Draft",
				" ",
				metres(ASSESSMENT.draft),
				" leaves ",
				metres(plan$1.underKeelLow),
				". This module wants at least half a metre."
			] })
		]
	});
}
function BridleLesson() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl leading-tight",
				children: "Set it, then unload the windlass"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "The arithmetic does not set the anchor. This is the film’s order, once the 24-hour rode is already decided."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
						index: "01",
						title: "Read the bay before you enter",
						children: "Contours, a flat patch, and the uncharted shallows. Put a waypoint on the spot. Do not pick a hole between mooring buoys because it looks empty."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
						index: "02",
						title: "Stop, head to wind, then drop",
						children: "Signal the bow. Let the anchor go. Only once it is on the bottom, motor astern so the chain lays out instead of piling on the shank."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
						index: "03",
						title: "Know when it has landed",
						children: "While it is hanging, the chain is tight across the deck. When it touches, that tension goes. Depth and the windlass rate tell you the same thing if you cannot see it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
						index: "04",
						title: "Set, then prove it",
						children: "A firm astern pull. Tight chain, shallow angle, and the boat springs forward when you ease the throttles. Take a transit on fixed shore marks. If the marks walk, you are dragging. Reset."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
						index: "05",
						title: "Bridle on a whole link",
						children: "Hook over one complete link. Sprung pin home. Do not pass the hook through the link — it jams on the way up. Veer another 5–6 m. The chain from roller to hook hangs in a loop. The windlass is no longer towing the boat."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
						index: "06",
						title: "Leave the same way",
						children: "Engines on so the winch has power. Bridle up first, and clear of the chain. Edge the boat forward onto the anchor. Arm signals for where the chain leads. Do not drive over it, and do not let the windlass drag the boat."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"No counter on that windlass: 1 metre every 2 seconds. The assessment veer of ",
					metres(plan$1.totalVeer),
					" is",
					" ",
					plan$1.windlassSeconds.toFixed(0),
					" seconds under that rule. Use it as a check, not as a substitute for knowing what you meant to put out."
				]
			})
		]
	});
}
var plan = buildPlan(ASSESSMENT);
var rode = metres(plan.workingRode);
var radius = metres(plan.swingAtLow);
var horizontal = metres(plan.horizontalAtLow);
var loop = metres(ASSESSMENT.bridleLoop);
var total = metres(plan.totalVeer);
var QUESTIONS = [
	{
		id: "six",
		stem: "Joe Fox walks through six components of anchoring the Lagoon 42. Which set is the one in the film?",
		choices: [
			"Anchor; wind and tidal flow; how much chain you drop; setting the hook; the bridle; communication and maneuvering.",
			"Lifejacket, liferaft, EPIRB, flares, grab-bag, and a VHF check. Those are abandon-ship items, not the anchoring job.",
			"Chartplotter update, AIS alarm, radar overlay, wind instrument, depth alarm, and a satellite messenger.",
			"Sail plan, reef, traveller, vang, outhaul, and halyard tension."
		],
		answer: 0,
		why: "The film’s job list is the anchor itself, wind and tide, the amount of chain, setting it, the bridle, and the talk between bow and helm while you maneuver. Safety gear still matters. It is not this lesson."
	},
	{
		id: "prep",
		stem: "What are the three prep steps before the anchor goes down?",
		choices: [
			"Stop the engine, dump the whole locker at once, and leave the helm to watch the bow.",
			"Remote out of the hatch and onto the deck; bridle and gear clear of the chain; prime the anchor over the roller with a touch of chain.",
			"Clip the bridle on in the locker, then drop anchor and bridle together.",
			"Motor astern at full throttle before the anchor is out of the roller."
		],
		answer: 1,
		why: "He wants the remote in hand, nothing fouling the run, and the anchor already started over the roller so it falls clean instead of hanging up."
	},
	{
		id: "light",
		stem: "In the film, for light and benign wind, how much chain does Joe put out relative to depth?",
		choices: [
			"The same length as the boat, regardless of depth.",
			"Ten times the depth, always.",
			"Three to four times the depth.",
			"One metre of chain for every knot of wind."
		],
		answer: 2,
		why: "Light air in the film is 3–4× depth. This module still will not brief a 24-hour stay at 3:1, and whatever multiple you use has to be applied to roller-to-seabed at high water — not to the number you happen to see when you drop."
	},
	{
		id: "twenty",
		stem: "He is planning for wind around 20 knots, and says be ready for up to about 25. What multiple does he use then?",
		choices: [
			"Stay at 3× if the anchor is oversized.",
			"About 5, 6, or 7 times the depth.",
			"Twice the depth, because all-chain does not need scope.",
			"Only the 5–6 m of the bridle loop."
		],
		answer: 1,
		why: "Around 20 knots he moves to 5–7×. The assessment anchorage uses the top of that band, 7:1, because the stay includes a night and a rising tide."
	},
	{
		id: "counter",
		stem: "The windlass in the film has no counter and pays out 1 metre every 2 seconds. How long is 15 metres of chain?",
		choices: [
			"15 seconds.",
			"30 seconds.",
			"45 seconds.",
			"2 minutes."
		],
		answer: 1,
		why: "Fifteen metres at 1 metre every 2 seconds is 30 seconds. He uses that example himself. A counter is better. The clock is the backup, not a guess."
	},
	{
		id: "which-high",
		stem: "You anchor at 16:00 and will stay 24 hours. The tide chart shows high water 1.7 m at 21:55 and 1.9 m at 09:25, and lows of 0.3 m at 03:10 and 0.4 m at 15:40. Which height sets the scope?",
		choices: [
			"1.7 m at 21:55, because it is the next high after you drop.",
			"0.3 m at 03:10, because scope should use the shallowest water.",
			"The average of the four heights.",
			"1.9 m at 09:25 — the highest water while you are actually on the hook."
		],
		answer: 3,
		why: "Scope is worst at the deepest moment of the stay, not at the next printed high. Tonight’s 1.7 m would leave you short when 1.9 m arrives in the morning. Low water is what sets the swing, not the scope."
	},
	{
		id: "rode",
		stem: "Chart depth 4.0 m, bow roller 1.2 m above the water, high water of the stay 1.9 m, target 7:1. How much working rode, before the bridle loop?",
		choices: [
			"28.0 m — 7 × the 4.0 m chart depth.",
			"36.4 m — 7 × chart depth and freeboard, ignoring the tide.",
			"41.3 m — 7 × chart depth and tide, ignoring the roller.",
			"49.7 m — 7 × (4.0 + 1.9 + 1.2)."
		],
		answer: 3,
		why: `Roller-to-seabed at high water is 7.1 m. Working rode is 7 × 7.1 = ${rode}. The 28 m figure is the mistake the film’s own 4 m example invites if you forget freeboard and the tide chart. At high water, 28 m is only ${ratioText(plan.naiveChartOnlyScope)}, not 7:1.`
	},
	{
		id: "swing",
		stem: `Working rode is ${rode}. Low water of the stay is 0.3 m, so roller-to-seabed is 5.5 m. The bridle reaches 5.5 m forward of the bows and the Lagoon 42 is 12.8 m long. What is the low-water swing radius?`,
		choices: [
			`${rode} — the rode alone, as if the boat had no length.`,
			`${total} — working rode plus the ${loop} bridle loop.`,
			`${radius} — horizontal reach plus bridle reach plus length overall.`,
			"12.8 m — the bridle stops the boat swinging, so only the hull matters."
		],
		answer: 2,
		why: `Horizontal reach is √(${rode.replace(" m", "")}² − 5.5²) = ${horizontal}. Swing radius is ${horizontal} + 5.5 m of bridle + 12.8 m of boat = ${radius}. Swing ratio at that low water is ${ratioText(plan.swingRatioAtLow)}. The loop is slack chain that unloads the windlass. It is not the radius, and it is not extra scope.`
	},
	{
		id: "decision",
		stem: `Same plan: working rode ${rode}, bridle loop ${loop}, low-water swing radius ${radius}, 80 m of chain on board. The nearest yacht sits 60 m from the anchor. What do you do?`,
		choices: [
			"Deploy. Scope is 7:1 and the chain locker can spare it.",
			"Deploy, but shorten the rode until the circle fits inside 60 m.",
			`Do not deploy. Low-water swing is ${radius} and will reach that yacht. Shortening the rode to shrink the circle gives up 7:1 at high water.`,
			"Deploy between the mooring buoys so their warps stop you swinging."
		],
		answer: 2,
		why: "Both gates have to pass. High-water scope can be met from the locker, and low-water swing cannot. Cutting scope to buy room is how boats drag on the top of the tide. Mooring fields are the place the film tells you to stay out of."
	},
	{
		id: "bridle",
		stem: "When is the bridle actually doing its job?",
		choices: [
			"The hook is passed through a link so it cannot fall off, and the windlass stays tight.",
			"The hook is over one whole link, the sprung pin is home, and you have veered another 5–6 m so the chain hangs in a slack loop.",
			"The bridle is made fast to the anchor shank before you drop.",
			"You have eased the chain until it is slack on the seabed and then stopped the engines."
		],
		answer: 1,
		why: "A hook through the link jams when you recover. Over a whole link, pin home, then 5–6 m more chain: the apex sits forward, the load leaves the windlass, and the chain between roller and hook hangs in a loop. On this boat that moves the centre of effort about 5–6 m forward and damps the horsing. It does not shrink the swing circle to the length of the boat."
	}
];
function scoreAnswers(answers) {
	const total = QUESTIONS.length;
	const complete = answers.length >= total && answers.slice(0, total).every((answer) => answer !== null);
	const correct = QUESTIONS.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0);
	return {
		correct,
		total,
		percent: Math.round(correct / total * 100),
		complete
	};
}
function QuizPanel({ answers, index, onAnswer, onIndex, onDone }) {
	const question = QUESTIONS[index];
	const chosen = answers[index];
	const locked = chosen !== null;
	const correct = chosen === question.answer;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				"Question ",
				index + 1,
				" of ",
				QUESTIONS.length
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-serif text-3xl leading-tight",
			children: "Check the decision, not the memory of a ratio"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-fg",
			children: question.stem
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "radiogroup",
			"aria-label": `Question ${index + 1}`,
			className: "mt-4 space-y-2",
			children: question.choices.map((choice, choiceIndex) => {
				const selected = chosen === choiceIndex;
				const showRight = locked && choiceIndex === question.answer;
				const showWrong = locked && selected && !correct;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "radio",
					"aria-checked": selected,
					disabled: locked,
					onClick: () => onAnswer(choiceIndex),
					className: `block min-h-11 w-full rounded-md border px-3 py-3 text-left text-sm disabled:opacity-100 ${showRight ? "border-brass text-fg" : showWrong ? "border-fail text-fg" : "border-line text-fg"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-2 text-muted",
							children: String.fromCharCode(65 + choiceIndex)
						}),
						choice,
						showRight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-xs text-brass",
							children: "This is the safe answer"
						}) : null,
						showWrong ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-xs text-fail",
							children: "Not this one"
						}) : null
					]
				}, choice);
			})
		}),
		locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: question.why
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ghostClass,
					disabled: index === 0,
					onClick: () => onIndex(index - 1),
					children: "Previous"
				}),
				locked && index < QUESTIONS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: primaryClass,
					onClick: () => onIndex(index + 1),
					children: "Next question"
				}) : null,
				locked && index === QUESTIONS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: primaryClass,
					onClick: onDone,
					children: "Score and open the record"
				}) : null
			]
		})
	] });
}
var STORAGE_KEY = "hws-scorm-1.2";
var WRITABLE = /* @__PURE__ */ new Set([
	"cmi.core.lesson_location",
	"cmi.core.lesson_status",
	"cmi.core.score.raw",
	"cmi.core.score.min",
	"cmi.core.score.max",
	"cmi.core.exit",
	"cmi.core.session_time",
	"cmi.suspend_data"
]);
var ERRORS = {
	"0": "No error",
	"101": "General exception",
	"201": "Invalid argument error",
	"301": "Not initialized",
	"403": "Element is read only",
	"405": "Incorrect data type"
};
var ROW_KEYS = [
	"cmi.core.student_name",
	"cmi.core.student_id",
	"cmi.core.lesson_status",
	"cmi.core.score.raw",
	"cmi.core.score.min",
	"cmi.core.score.max",
	"cmi.core.lesson_location",
	"cmi.core.session_time",
	"cmi.core.exit",
	"cmi.core.entry",
	"cmi.core.lesson_mode",
	"cmi.core.credit",
	"cmi.suspend_data"
];
function findApi(win) {
	const seen = /* @__PURE__ */ new Set();
	let current = win;
	for (let hop = 0; hop < 8 && current && !seen.has(current); hop++) {
		seen.add(current);
		const candidate = current.API;
		if (candidate && typeof candidate.LMSInitialize === "function" && !candidate.__hwsShim) return candidate;
		if (current.parent && current.parent !== current) current = current.parent;
		else break;
	}
	const opener = win.opener;
	if (opener && typeof opener.API?.LMSInitialize === "function" && !opener.API.__hwsShim) return opener.API;
	return null;
}
function formatSession(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor(total % 3600 / 60);
	const seconds = total % 60;
	return `${String(hours).padStart(4, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.00`;
}
function readStore() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return {};
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : {};
	} catch {
		return {};
	}
}
function installShim() {
	const existing = window.API;
	if (existing?.__hwsShim) return existing;
	let store = readStore();
	let error = "0";
	let initialized = false;
	const api = {
		__hwsShim: true,
		LMSInitialize: () => {
			store = readStore();
			initialized = true;
			error = "0";
			if (!store["cmi.core.lesson_status"]) {
				store["cmi.core.entry"] = "ab-initio";
				store["cmi.core.lesson_status"] = "not attempted";
			} else store["cmi.core.entry"] = store["cmi.suspend_data"] ? "resume" : "ab-initio";
			store["cmi.core.student_name"] = store["cmi.core.student_name"] || "Preview Learner";
			store["cmi.core.student_id"] = store["cmi.core.student_id"] || "preview";
			store["cmi.core.lesson_mode"] = "normal";
			store["cmi.core.credit"] = "credit";
			store["cmi.core.score.min"] = store["cmi.core.score.min"] || "0";
			store["cmi.core.score.max"] = store["cmi.core.score.max"] || "100";
			localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
			return "true";
		},
		LMSFinish: () => {
			if (!initialized) {
				error = "301";
				return "false";
			}
			initialized = false;
			error = "0";
			localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
			return "true";
		},
		LMSGetValue: (key) => {
			if (!initialized) {
				error = "301";
				return "";
			}
			error = "0";
			return store[key] ?? "";
		},
		LMSSetValue: (key, value) => {
			if (!initialized) {
				error = "301";
				return "false";
			}
			if (!WRITABLE.has(key)) {
				error = "403";
				return "false";
			}
			if (key === "cmi.suspend_data" && value.length > 4096) {
				error = "405";
				return "false";
			}
			if (key === "cmi.core.lesson_status" && !(/* @__PURE__ */ new Set([
				"passed",
				"completed",
				"failed",
				"incomplete",
				"browsed",
				"not attempted"
			])).has(value)) {
				error = "405";
				return "false";
			}
			store[key] = value;
			error = "0";
			return "true";
		},
		LMSCommit: () => {
			if (!initialized) {
				error = "301";
				return "false";
			}
			localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
			error = "0";
			return "true";
		},
		LMSGetLastError: () => error,
		LMSGetErrorString: (code) => ERRORS[code] ?? "Unknown error",
		LMSGetDiagnostic: (code) => ERRORS[code] ?? error
	};
	window.API = api;
	return api;
}
function openScorm() {
	const started = Date.now();
	const lms = findApi(window);
	const api = lms ?? installShim();
	const log = [];
	const note = (call, detail) => {
		log.unshift({
			call,
			detail
		});
		if (log.length > 12) log.pop();
	};
	const init = api.LMSInitialize("");
	note("LMSInitialize", String(init));
	if (api.LMSGetValue("cmi.core.lesson_status") === "not attempted" || api.LMSGetValue("cmi.core.lesson_status") === "") {
		api.LMSSetValue("cmi.core.lesson_status", "incomplete");
		note("LMSSetValue", "cmi.core.lesson_status = incomplete");
	}
	api.LMSSetValue("cmi.core.score.min", "0");
	api.LMSSetValue("cmi.core.score.max", "100");
	api.LMSSetValue("cmi.core.exit", "suspend");
	api.LMSCommit("");
	note("LMSCommit", "bookmark armed");
	return {
		mode: lms ? "lms" : "preview",
		log,
		getValue: (key) => api.LMSGetValue(key) ?? "",
		setValue: (key, value) => {
			const ok = api.LMSSetValue(key, value) === "true";
			note("LMSSetValue", ok ? `${key} = ${value.slice(0, 80)}` : `${key} rejected ${api.LMSGetLastError()}`);
			return ok;
		},
		commit: () => {
			api.LMSSetValue("cmi.core.session_time", formatSession(Date.now() - started));
			const ok = api.LMSCommit("") === "true";
			note("LMSCommit", ok ? "ok" : api.LMSGetLastError());
			return ok;
		},
		finish: () => {
			api.LMSSetValue("cmi.core.session_time", formatSession(Date.now() - started));
			api.LMSSetValue("cmi.core.exit", "suspend");
			api.LMSCommit("");
			const ok = api.LMSFinish("") === "true";
			note("LMSFinish", ok ? "ok" : api.LMSGetLastError());
			return ok;
		},
		rows: () => ROW_KEYS.map((key) => ({
			key,
			value: api.LMSGetValue(key) ?? ""
		}))
	};
}
function readSuspend(raw, questionCount) {
	const empty = {
		step: 0,
		answers: Array(questionCount).fill(null),
		deployCleared: false,
		bestScore: null
	};
	if (!raw) return empty;
	try {
		const parsed = JSON.parse(raw);
		const answers = Array.from({ length: questionCount }, (_, index) => {
			const value = parsed.answers?.[index];
			return typeof value === "number" && Number.isInteger(value) ? value : null;
		});
		return {
			step: typeof parsed.step === "number" ? parsed.step : 0,
			answers,
			deployCleared: parsed.deployCleared === true,
			bestScore: typeof parsed.bestScore === "number" ? parsed.bestScore : null
		};
	} catch {
		return empty;
	}
}
var ZIP = "/downloads/high-water-scope-scorm12.zip";
function CourseApp() {
	const scormRef = (0, import_react.useRef)(null);
	const dirty = (0, import_react.useRef)(false);
	const stateRef = (0, import_react.useRef)(null);
	const [module, setModule] = (0, import_react.useState)("approach");
	const [mode, setMode] = (0, import_react.useState)("preview");
	const [tick, setTick] = (0, import_react.useState)(0);
	const [plan, setPlan] = (0, import_react.useState)(() => clonePlan(ASSESSMENT));
	const [state, setState] = (0, import_react.useState)({
		step: 0,
		answers: Array(QUESTIONS.length).fill(null),
		qIndex: 0,
		deployCleared: false,
		bestScore: null
	});
	stateRef.current = state;
	const commit = (scorm, next) => {
		const score = scoreAnswers(next.answers);
		const sitting = score.complete ? score.percent : null;
		const best = sitting === null ? next.bestScore : Math.max(next.bestScore ?? sitting, sitting);
		const stored = {
			...next,
			bestScore: best
		};
		const lesson = best !== null && best >= 80 && stored.deployCleared ? "passed" : sitting !== null && sitting < 80 ? "failed" : "incomplete";
		scorm.setValue("cmi.core.lesson_location", STEPS[stored.step].id);
		scorm.setValue("cmi.suspend_data", JSON.stringify({
			step: stored.step,
			answers: stored.answers,
			deployCleared: stored.deployCleared,
			bestScore: stored.bestScore
		}));
		scorm.setValue("cmi.core.exit", "suspend");
		if (best !== null) {
			scorm.setValue("cmi.core.score.raw", String(best));
			scorm.setValue("cmi.core.score.min", "0");
			scorm.setValue("cmi.core.score.max", "100");
		}
		scorm.setValue("cmi.core.lesson_status", lesson);
		scorm.commit();
		return stored;
	};
	(0, import_react.useEffect)(() => {
		const scorm = openScorm();
		scormRef.current = scorm;
		if (dirty.current && stateRef.current) commit(scorm, stateRef.current);
		else {
			const suspend = readSuspend(scorm.getValue("cmi.suspend_data"), QUESTIONS.length);
			const location = scorm.getValue("cmi.core.lesson_location");
			const unfinished = suspend.answers.findIndex((answer) => answer === null);
			const rawScore = Number(scorm.getValue("cmi.core.score.raw"));
			const bestFromLms = Number.isFinite(rawScore) && scorm.getValue("cmi.core.score.raw") !== "" ? rawScore : null;
			setState({
				step: location ? stepIndex(location) : suspend.step,
				answers: suspend.answers,
				qIndex: unfinished < 0 ? QUESTIONS.length - 1 : unfinished,
				deployCleared: suspend.deployCleared,
				bestScore: suspend.bestScore ?? bestFromLms
			});
		}
		setMode(scorm.mode);
		setTick((value) => value + 1);
		const onHide = () => scorm.finish();
		window.addEventListener("pagehide", onHide);
		return () => window.removeEventListener("pagehide", onHide);
	}, []);
	const write = (next) => {
		dirty.current = true;
		const scorm = scormRef.current;
		const stored = scorm ? commit(scorm, next) : next;
		setState(stored);
		if (scorm) setTick((value) => value + 1);
	};
	const go = (step) => write({
		...state,
		step
	});
	const score = scoreAnswers(state.answers);
	const passed = (state.bestScore ?? 0) >= 80 && state.deployCleared;
	const rows = scormRef.current?.rows() ?? [];
	const log = scormRef.current?.log ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-bg/95",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-serif text-2xl leading-none tracking-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ALL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brass",
									children: "SAIL"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs tracking-widest text-muted",
								children: "PITTWATER · CHURCH POINT"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 flex-col items-end gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden text-xs tracking-widest text-muted sm:block",
								children: "YACHT & CATAMARAN CHARTERS"
							}), module === "scope" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full border px-3 py-2 text-xs ${passed ? "border-brass text-brass" : "border-line text-muted"}`,
								children: passed ? "Passed" : state.bestScore !== null && score.complete && state.bestScore < 80 ? "Failed" : "In progress"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-line px-3 py-2 text-xs text-muted",
								children: "Follow-on"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-3xl gap-2 px-4 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": module === "scope",
							className: `h-11 rounded-full px-3 text-sm ${module === "scope" ? "bg-brass text-brass-ink" : "text-muted"}`,
							onClick: () => setModule("scope"),
							children: "Scope"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": module === "approach",
							className: `h-11 rounded-full px-3 text-sm ${module === "approach" ? "bg-brass text-brass-ink" : "text-muted"}`,
							onClick: () => setModule("approach"),
							children: "Approach"
						})]
					}),
					module === "scope" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 pb-3",
						children: STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-current": index === state.step ? "step" : void 0,
							className: `h-11 shrink-0 rounded-full px-3 text-sm ${index === state.step ? "bg-brass text-brass-ink" : "text-muted"}`,
							onClick: () => go(index),
							children: step.short
						}, step.id))
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "mx-auto max-w-3xl px-4 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/brand/impulso.jpg",
					alt: "Impulso, the AllSail Lagoon 39, on Pittwater",
					className: "w-full border border-line"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "mt-2 text-xs tracking-widest text-muted",
					children: "IMPULSO · LAGOON 39 · PITTWATER"
				})]
			}),
			module === "approach" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApproachCourse, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-4 pb-28 pt-6",
				children: [
					state.step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefLesson, {}) : null,
					state.step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SixLesson, {}) : null,
					state.step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeLesson, {}) : null,
					state.step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwingLesson, {}) : null,
					state.step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {
						value: plan,
						onChange: setPlan,
						recorded: state.deployCleared,
						onRecord: () => write({
							...state,
							deployCleared: true
						})
					}) : null,
					state.step === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BridleLesson, {}) : null,
					state.step === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPanel, {
						answers: state.answers,
						index: state.qIndex,
						onAnswer: (choice) => {
							if (state.answers[state.qIndex] !== null) return;
							const answers = state.answers.slice();
							answers[state.qIndex] = choice;
							write({
								...state,
								answers
							});
						},
						onIndex: (qIndex) => write({
							...state,
							qIndex
						}),
						onDone: () => write({
							...state,
							step: 7
						})
					}) : null,
					state.step === 7 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Record, {
						percent: state.bestScore,
						complete: score.complete,
						correct: score.correct,
						deployCleared: state.deployCleared,
						passed,
						mode,
						rows,
						log,
						missed: QUESTIONS.map((question, index) => ({
							question,
							chosen: state.answers[index]
						})).filter((item) => item.chosen !== null && item.chosen !== item.question.answer),
						onReset: () => write({
							step: 0,
							answers: Array(QUESTIONS.length).fill(null),
							qIndex: 0,
							deployCleared: false,
							bestScore: null
						}),
						onRetry: () => write({
							...state,
							step: 6,
							qIndex: 0,
							answers: Array(QUESTIONS.length).fill(null)
						}),
						onQuiz: () => go(6),
						onChart: () => go(4)
					}) : null
				]
			}), state.step !== 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 border-t border-line bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-3xl gap-2 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `${ghostClass} flex-1`,
						disabled: state.step === 0,
						onClick: () => go(state.step - 1),
						children: "Back"
					}), state.step < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `${primaryClass} flex-1`,
						onClick: () => go(state.step + 1),
						children: "Continue"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: `${primaryClass} flex-1`,
						href: ZIP,
						download: "high-water-scope-scorm12.zip",
						children: "Download package"
					})]
				})
			}) : null] })
		]
	});
}
function Record({ percent, complete, correct, deployCleared, passed, mode, rows, log, missed, onReset, onRetry, onQuiz, onChart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl leading-tight",
				children: passed ? "Recorded as passed" : "Not passed yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					"A pass is ",
					80,
					"% on the ten questions and a cleared deployment on the assessment anchorage. Both are written to the SCORM 1.2 data model: score, lesson status, bookmark, and suspend data."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-surface p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Quiz"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-serif text-2xl",
							children: complete && percent !== null ? `${percent}%` : "Not scored"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: complete ? `${correct} of ${QUESTIONS.length} on the latest sitting` : "Answer all ten"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-surface p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "24-hour deployment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `mt-1 font-serif text-2xl ${deployCleared ? "text-brass" : "text-fail"}`,
							children: deployCleared ? "Cleared" : "Not recorded"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "Scope at high water, swing at low water"
						})
					]
				})]
			}),
			!deployCleared ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: ghostClass,
				onClick: onChart,
				children: "Open the tide chart"
			}) : null,
			!complete || percent !== null && percent < 80 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: `${ghostClass} ml-2`,
				onClick: complete ? onRetry : onQuiz,
				children: complete ? "Retry the quiz" : "Open the quiz"
			}) : null,
			missed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "Missed"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-3",
				children: missed.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-md border border-line p-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.question.stem }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: item.question.why
					})]
				}, item.question.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: mode === "lms" ? "This attempt is talking to an LMS SCORM API in the parent window." : "No LMS API was found above this page, so a local SCORM 1.2 shim is storing the attempt. Import the zip into an LMS and the same calls go to the real API."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-md border border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full text-left text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line align-top last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium text-muted",
							children: row.key
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 break-all",
							children: row.value || "—"
						})]
					}, row.key)) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-xs text-muted",
				children: log.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					entry.call,
					": ",
					entry.detail
				] }, `${entry.call}-${index}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: primaryClass,
					href: ZIP,
					download: "high-water-scope-scorm12.zip",
					children: "Download SCORM 1.2 zip"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ghostClass,
					onClick: onReset,
					children: "Reset this attempt"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Import the zip as a package. The manifest is at the root. Do not upload a folder unless the LMS asks for imsmanifest.xml itself. Package id: com.highwaterscope.catamaran-anchor.12. Mastery score 80."
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseApp, {});
}
//#endregion
export { Home as component };
