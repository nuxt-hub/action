import { createRequire } from "node:module";
import { basename } from "node:path";
import ie, { PassThrough, pipeline } from "node:stream";
import { deprecate, promisify, types } from "node:util";
import { format } from "node:url";
import { createReadStream, promises, statSync } from "node:fs";
import { Buffer as Buffer$1 } from "node:buffer";
import http from "node:http";
import https from "node:https";
import Ye from "node:zlib";
import { isIP } from "node:net";

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n$2 = keys.length, key; i < n$2; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k$1) => from[k$1]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ createRequire(import.meta.url);

//#endregion
//#region node_modules/.pnpm/node-fetch-native@1.6.6/node_modules/node-fetch-native/dist/shared/node-fetch-native.DfbY2q-x.mjs
var t = Object.defineProperty;
var o = (e, l) => t(e, "name", {
	value: l,
	configurable: !0
});
var n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function f(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
o(f, "getDefaultExportFromCjs");

//#endregion
//#region node_modules/.pnpm/node-fetch-native@1.6.6/node_modules/node-fetch-native/dist/node.mjs
var Va = Object.defineProperty;
var n$1 = (i, o$1) => Va(i, "name", {
	value: o$1,
	configurable: !0
});
function ts(i) {
	if (!/^data:/i.test(i)) throw new TypeError("`uri` does not appear to be a Data URI (must begin with \"data:\")");
	i = i.replace(/\r?\n/g, "");
	const o$1 = i.indexOf(",");
	if (o$1 === -1 || o$1 <= 4) throw new TypeError("malformed data: URI");
	const a = i.substring(5, o$1).split(";");
	let l = "", u = !1;
	const m = a[0] || "text/plain";
	let h = m;
	for (let A = 1; A < a.length; A++) a[A] === "base64" ? u = !0 : a[A] && (h += `;${a[A]}`, a[A].indexOf("charset=") === 0 && (l = a[A].substring(8)));
	!a[0] && !l.length && (h += ";charset=US-ASCII", l = "US-ASCII");
	const S = u ? "base64" : "ascii", E = unescape(i.substring(o$1 + 1)), w = Buffer.from(E, S);
	return w.type = m, w.typeFull = h, w.charset = l, w;
}
n$1(ts, "dataUriToBuffer");
var Eo = {}, ct = { exports: {} };
/**
* @license
* web-streams-polyfill v3.3.3
* Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
* This code is released under the MIT license.
* SPDX-License-Identifier: MIT
*/ var rs = ct.exports, vo;
function ns() {
	return vo || (vo = 1, function(i, o$1) {
		(function(a, l) {
			l(o$1);
		})(rs, function(a) {
			function l() {}
			n$1(l, "noop");
			function u(e) {
				return typeof e == "object" && e !== null || typeof e == "function";
			}
			n$1(u, "typeIsObject");
			const m = l;
			function h(e, t$1) {
				try {
					Object.defineProperty(e, "name", {
						value: t$1,
						configurable: !0
					});
				} catch {}
			}
			n$1(h, "setFunctionName");
			const S = Promise, E = Promise.prototype.then, w = Promise.reject.bind(S);
			function A(e) {
				return new S(e);
			}
			n$1(A, "newPromise");
			function T(e) {
				return A((t$1) => t$1(e));
			}
			n$1(T, "promiseResolvedWith");
			function b(e) {
				return w(e);
			}
			n$1(b, "promiseRejectedWith");
			function q(e, t$1, r) {
				return E.call(e, t$1, r);
			}
			n$1(q, "PerformPromiseThen");
			function g(e, t$1, r) {
				q(q(e, t$1, r), void 0, m);
			}
			n$1(g, "uponPromise");
			function V(e, t$1) {
				g(e, t$1);
			}
			n$1(V, "uponFulfillment");
			function I(e, t$1) {
				g(e, void 0, t$1);
			}
			n$1(I, "uponRejection");
			function F(e, t$1, r) {
				return q(e, t$1, r);
			}
			n$1(F, "transformPromiseWith");
			function Q(e) {
				q(e, void 0, m);
			}
			n$1(Q, "setPromiseIsHandledToTrue");
			let se = n$1((e) => {
				if (typeof queueMicrotask == "function") se = queueMicrotask;
				else {
					const t$1 = T(void 0);
					se = n$1((r) => q(t$1, r), "_queueMicrotask");
				}
				return se(e);
			}, "_queueMicrotask");
			function O(e, t$1, r) {
				if (typeof e != "function") throw new TypeError("Argument is not a function");
				return Function.prototype.apply.call(e, t$1, r);
			}
			n$1(O, "reflectCall");
			function z(e, t$1, r) {
				try {
					return T(O(e, t$1, r));
				} catch (s) {
					return b(s);
				}
			}
			n$1(z, "promiseCall");
			const $ = 16384;
			class M {
				static {
					n$1(this, "SimpleQueue");
				}
				constructor() {
					this._cursor = 0, this._size = 0, this._front = {
						_elements: [],
						_next: void 0
					}, this._back = this._front, this._cursor = 0, this._size = 0;
				}
				get length() {
					return this._size;
				}
				push(t$1) {
					const r = this._back;
					let s = r;
					r._elements.length === $ - 1 && (s = {
						_elements: [],
						_next: void 0
					}), r._elements.push(t$1), s !== r && (this._back = s, r._next = s), ++this._size;
				}
				shift() {
					const t$1 = this._front;
					let r = t$1;
					const s = this._cursor;
					let f$1 = s + 1;
					const c = t$1._elements, d = c[s];
					return f$1 === $ && (r = t$1._next, f$1 = 0), --this._size, this._cursor = f$1, t$1 !== r && (this._front = r), c[s] = void 0, d;
				}
				forEach(t$1) {
					let r = this._cursor, s = this._front, f$1 = s._elements;
					for (; (r !== f$1.length || s._next !== void 0) && !(r === f$1.length && (s = s._next, f$1 = s._elements, r = 0, f$1.length === 0));) t$1(f$1[r]), ++r;
				}
				peek() {
					const t$1 = this._front, r = this._cursor;
					return t$1._elements[r];
				}
			}
			const pt = Symbol("[[AbortSteps]]"), an = Symbol("[[ErrorSteps]]"), ar = Symbol("[[CancelSteps]]"), sr = Symbol("[[PullSteps]]"), ur = Symbol("[[ReleaseSteps]]");
			function sn(e, t$1) {
				e._ownerReadableStream = t$1, t$1._reader = e, t$1._state === "readable" ? fr(e) : t$1._state === "closed" ? ri(e) : un(e, t$1._storedError);
			}
			n$1(sn, "ReadableStreamReaderGenericInitialize");
			function lr(e, t$1) {
				const r = e._ownerReadableStream;
				return X(r, t$1);
			}
			n$1(lr, "ReadableStreamReaderGenericCancel");
			function ue(e) {
				const t$1 = e._ownerReadableStream;
				t$1._state === "readable" ? cr(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : ni(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t$1._readableStreamController[ur](), t$1._reader = void 0, e._ownerReadableStream = void 0;
			}
			n$1(ue, "ReadableStreamReaderGenericRelease");
			function yt(e) {
				return new TypeError("Cannot " + e + " a stream using a released reader");
			}
			n$1(yt, "readerLockException");
			function fr(e) {
				e._closedPromise = A((t$1, r) => {
					e._closedPromise_resolve = t$1, e._closedPromise_reject = r;
				});
			}
			n$1(fr, "defaultReaderClosedPromiseInitialize");
			function un(e, t$1) {
				fr(e), cr(e, t$1);
			}
			n$1(un, "defaultReaderClosedPromiseInitializeAsRejected");
			function ri(e) {
				fr(e), ln(e);
			}
			n$1(ri, "defaultReaderClosedPromiseInitializeAsResolved");
			function cr(e, t$1) {
				e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t$1), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
			}
			n$1(cr, "defaultReaderClosedPromiseReject");
			function ni(e, t$1) {
				un(e, t$1);
			}
			n$1(ni, "defaultReaderClosedPromiseResetToRejected");
			function ln(e) {
				e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
			}
			n$1(ln, "defaultReaderClosedPromiseResolve");
			const fn = Number.isFinite || function(e) {
				return typeof e == "number" && isFinite(e);
			}, oi = Math.trunc || function(e) {
				return e < 0 ? Math.ceil(e) : Math.floor(e);
			};
			function ii(e) {
				return typeof e == "object" || typeof e == "function";
			}
			n$1(ii, "isDictionary");
			function ne(e, t$1) {
				if (e !== void 0 && !ii(e)) throw new TypeError(`${t$1} is not an object.`);
			}
			n$1(ne, "assertDictionary");
			function G(e, t$1) {
				if (typeof e != "function") throw new TypeError(`${t$1} is not a function.`);
			}
			n$1(G, "assertFunction");
			function ai(e) {
				return typeof e == "object" && e !== null || typeof e == "function";
			}
			n$1(ai, "isObject");
			function cn(e, t$1) {
				if (!ai(e)) throw new TypeError(`${t$1} is not an object.`);
			}
			n$1(cn, "assertObject");
			function le(e, t$1, r) {
				if (e === void 0) throw new TypeError(`Parameter ${t$1} is required in '${r}'.`);
			}
			n$1(le, "assertRequiredArgument");
			function dr(e, t$1, r) {
				if (e === void 0) throw new TypeError(`${t$1} is required in '${r}'.`);
			}
			n$1(dr, "assertRequiredField");
			function hr(e) {
				return Number(e);
			}
			n$1(hr, "convertUnrestrictedDouble");
			function dn(e) {
				return e === 0 ? 0 : e;
			}
			n$1(dn, "censorNegativeZero");
			function si(e) {
				return dn(oi(e));
			}
			n$1(si, "integerPart");
			function mr(e, t$1) {
				const s = Number.MAX_SAFE_INTEGER;
				let f$1 = Number(e);
				if (f$1 = dn(f$1), !fn(f$1)) throw new TypeError(`${t$1} is not a finite number`);
				if (f$1 = si(f$1), f$1 < 0 || f$1 > s) throw new TypeError(`${t$1} is outside the accepted range of 0 to ${s}, inclusive`);
				return !fn(f$1) || f$1 === 0 ? 0 : f$1;
			}
			n$1(mr, "convertUnsignedLongLongWithEnforceRange");
			function br(e, t$1) {
				if (!Te(e)) throw new TypeError(`${t$1} is not a ReadableStream.`);
			}
			n$1(br, "assertReadableStream");
			function ze(e) {
				return new ye(e);
			}
			n$1(ze, "AcquireReadableStreamDefaultReader");
			function hn(e, t$1) {
				e._reader._readRequests.push(t$1);
			}
			n$1(hn, "ReadableStreamAddReadRequest");
			function pr(e, t$1, r) {
				const f$1 = e._reader._readRequests.shift();
				r ? f$1._closeSteps() : f$1._chunkSteps(t$1);
			}
			n$1(pr, "ReadableStreamFulfillReadRequest");
			function gt(e) {
				return e._reader._readRequests.length;
			}
			n$1(gt, "ReadableStreamGetNumReadRequests");
			function mn(e) {
				const t$1 = e._reader;
				return !(t$1 === void 0 || !ge(t$1));
			}
			n$1(mn, "ReadableStreamHasDefaultReader");
			class ye {
				static {
					n$1(this, "ReadableStreamDefaultReader");
				}
				constructor(t$1) {
					if (le(t$1, 1, "ReadableStreamDefaultReader"), br(t$1, "First parameter"), Ce(t$1)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
					sn(this, t$1), this._readRequests = new M();
				}
				get closed() {
					return ge(this) ? this._closedPromise : b(_t("closed"));
				}
				cancel(t$1 = void 0) {
					return ge(this) ? this._ownerReadableStream === void 0 ? b(yt("cancel")) : lr(this, t$1) : b(_t("cancel"));
				}
				read() {
					if (!ge(this)) return b(_t("read"));
					if (this._ownerReadableStream === void 0) return b(yt("read from"));
					let t$1, r;
					const s = A((c, d) => {
						t$1 = c, r = d;
					});
					return et(this, {
						_chunkSteps: n$1((c) => t$1({
							value: c,
							done: !1
						}), "_chunkSteps"),
						_closeSteps: n$1(() => t$1({
							value: void 0,
							done: !0
						}), "_closeSteps"),
						_errorSteps: n$1((c) => r(c), "_errorSteps")
					}), s;
				}
				releaseLock() {
					if (!ge(this)) throw _t("releaseLock");
					this._ownerReadableStream !== void 0 && ui(this);
				}
			}
			Object.defineProperties(ye.prototype, {
				cancel: { enumerable: !0 },
				read: { enumerable: !0 },
				releaseLock: { enumerable: !0 },
				closed: { enumerable: !0 }
			}), h(ye.prototype.cancel, "cancel"), h(ye.prototype.read, "read"), h(ye.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ye.prototype, Symbol.toStringTag, {
				value: "ReadableStreamDefaultReader",
				configurable: !0
			});
			function ge(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_readRequests") ? !1 : e instanceof ye;
			}
			n$1(ge, "IsReadableStreamDefaultReader");
			function et(e, t$1) {
				const r = e._ownerReadableStream;
				r._disturbed = !0, r._state === "closed" ? t$1._closeSteps() : r._state === "errored" ? t$1._errorSteps(r._storedError) : r._readableStreamController[sr](t$1);
			}
			n$1(et, "ReadableStreamDefaultReaderRead");
			function ui(e) {
				ue(e);
				const t$1 = new TypeError("Reader was released");
				bn(e, t$1);
			}
			n$1(ui, "ReadableStreamDefaultReaderRelease");
			function bn(e, t$1) {
				const r = e._readRequests;
				e._readRequests = new M(), r.forEach((s) => {
					s._errorSteps(t$1);
				});
			}
			n$1(bn, "ReadableStreamDefaultReaderErrorReadRequests");
			function _t(e) {
				return new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`);
			}
			n$1(_t, "defaultReaderBrandCheckException");
			const li = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {}).prototype);
			class pn {
				static {
					n$1(this, "ReadableStreamAsyncIteratorImpl");
				}
				constructor(t$1, r) {
					this._ongoingPromise = void 0, this._isFinished = !1, this._reader = t$1, this._preventCancel = r;
				}
				next() {
					const t$1 = n$1(() => this._nextSteps(), "nextSteps");
					return this._ongoingPromise = this._ongoingPromise ? F(this._ongoingPromise, t$1, t$1) : t$1(), this._ongoingPromise;
				}
				return(t$1) {
					const r = n$1(() => this._returnSteps(t$1), "returnSteps");
					return this._ongoingPromise ? F(this._ongoingPromise, r, r) : r();
				}
				_nextSteps() {
					if (this._isFinished) return Promise.resolve({
						value: void 0,
						done: !0
					});
					const t$1 = this._reader;
					let r, s;
					const f$1 = A((d, p) => {
						r = d, s = p;
					});
					return et(t$1, {
						_chunkSteps: n$1((d) => {
							this._ongoingPromise = void 0, se(() => r({
								value: d,
								done: !1
							}));
						}, "_chunkSteps"),
						_closeSteps: n$1(() => {
							this._ongoingPromise = void 0, this._isFinished = !0, ue(t$1), r({
								value: void 0,
								done: !0
							});
						}, "_closeSteps"),
						_errorSteps: n$1((d) => {
							this._ongoingPromise = void 0, this._isFinished = !0, ue(t$1), s(d);
						}, "_errorSteps")
					}), f$1;
				}
				_returnSteps(t$1) {
					if (this._isFinished) return Promise.resolve({
						value: t$1,
						done: !0
					});
					this._isFinished = !0;
					const r = this._reader;
					if (!this._preventCancel) {
						const s = lr(r, t$1);
						return ue(r), F(s, () => ({
							value: t$1,
							done: !0
						}));
					}
					return ue(r), T({
						value: t$1,
						done: !0
					});
				}
			}
			const yn = {
				next() {
					return gn(this) ? this._asyncIteratorImpl.next() : b(_n("next"));
				},
				return(e) {
					return gn(this) ? this._asyncIteratorImpl.return(e) : b(_n("return"));
				}
			};
			Object.setPrototypeOf(yn, li);
			function fi(e, t$1) {
				const r = ze(e), s = new pn(r, t$1), f$1 = Object.create(yn);
				return f$1._asyncIteratorImpl = s, f$1;
			}
			n$1(fi, "AcquireReadableStreamAsyncIterator");
			function gn(e) {
				if (!u(e) || !Object.prototype.hasOwnProperty.call(e, "_asyncIteratorImpl")) return !1;
				try {
					return e._asyncIteratorImpl instanceof pn;
				} catch {
					return !1;
				}
			}
			n$1(gn, "IsReadableStreamAsyncIterator");
			function _n(e) {
				return new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`);
			}
			n$1(_n, "streamAsyncIteratorBrandCheckException");
			const Sn = Number.isNaN || function(e) {
				return e !== e;
			};
			var yr, gr, _r;
			function tt(e) {
				return e.slice();
			}
			n$1(tt, "CreateArrayFromList");
			function wn(e, t$1, r, s, f$1) {
				new Uint8Array(e).set(new Uint8Array(r, s, f$1), t$1);
			}
			n$1(wn, "CopyDataBlockBytes");
			let fe = n$1((e) => (typeof e.transfer == "function" ? fe = n$1((t$1) => t$1.transfer(), "TransferArrayBuffer") : typeof structuredClone == "function" ? fe = n$1((t$1) => structuredClone(t$1, { transfer: [t$1] }), "TransferArrayBuffer") : fe = n$1((t$1) => t$1, "TransferArrayBuffer"), fe(e)), "TransferArrayBuffer"), _e = n$1((e) => (typeof e.detached == "boolean" ? _e = n$1((t$1) => t$1.detached, "IsDetachedBuffer") : _e = n$1((t$1) => t$1.byteLength === 0, "IsDetachedBuffer"), _e(e)), "IsDetachedBuffer");
			function Rn(e, t$1, r) {
				if (e.slice) return e.slice(t$1, r);
				const s = r - t$1, f$1 = new ArrayBuffer(s);
				return wn(f$1, 0, e, t$1, s), f$1;
			}
			n$1(Rn, "ArrayBufferSlice");
			function St(e, t$1) {
				const r = e[t$1];
				if (r != null) {
					if (typeof r != "function") throw new TypeError(`${String(t$1)} is not a function`);
					return r;
				}
			}
			n$1(St, "GetMethod");
			function ci(e) {
				const t$1 = { [Symbol.iterator]: () => e.iterator }, r = async function* () {
					return yield* t$1;
				}(), s = r.next;
				return {
					iterator: r,
					nextMethod: s,
					done: !1
				};
			}
			n$1(ci, "CreateAsyncFromSyncIterator");
			const Sr = (_r = (yr = Symbol.asyncIterator) !== null && yr !== void 0 ? yr : (gr = Symbol.for) === null || gr === void 0 ? void 0 : gr.call(Symbol, "Symbol.asyncIterator")) !== null && _r !== void 0 ? _r : "@@asyncIterator";
			function Tn(e, t$1 = "sync", r) {
				if (r === void 0) if (t$1 === "async") {
					if (r = St(e, Sr), r === void 0) {
						const c = St(e, Symbol.iterator), d = Tn(e, "sync", c);
						return ci(d);
					}
				} else r = St(e, Symbol.iterator);
				if (r === void 0) throw new TypeError("The object is not iterable");
				const s = O(r, e, []);
				if (!u(s)) throw new TypeError("The iterator method must return an object");
				const f$1 = s.next;
				return {
					iterator: s,
					nextMethod: f$1,
					done: !1
				};
			}
			n$1(Tn, "GetIterator");
			function di(e) {
				const t$1 = O(e.nextMethod, e.iterator, []);
				if (!u(t$1)) throw new TypeError("The iterator.next() method must return an object");
				return t$1;
			}
			n$1(di, "IteratorNext");
			function hi(e) {
				return !!e.done;
			}
			n$1(hi, "IteratorComplete");
			function mi(e) {
				return e.value;
			}
			n$1(mi, "IteratorValue");
			function bi(e) {
				return !(typeof e != "number" || Sn(e) || e < 0);
			}
			n$1(bi, "IsNonNegativeNumber");
			function Cn(e) {
				const t$1 = Rn(e.buffer, e.byteOffset, e.byteOffset + e.byteLength);
				return new Uint8Array(t$1);
			}
			n$1(Cn, "CloneAsUint8Array");
			function wr(e) {
				const t$1 = e._queue.shift();
				return e._queueTotalSize -= t$1.size, e._queueTotalSize < 0 && (e._queueTotalSize = 0), t$1.value;
			}
			n$1(wr, "DequeueValue");
			function Rr(e, t$1, r) {
				if (!bi(r) || r === Infinity) throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
				e._queue.push({
					value: t$1,
					size: r
				}), e._queueTotalSize += r;
			}
			n$1(Rr, "EnqueueValueWithSize");
			function pi(e) {
				return e._queue.peek().value;
			}
			n$1(pi, "PeekQueueValue");
			function Se(e) {
				e._queue = new M(), e._queueTotalSize = 0;
			}
			n$1(Se, "ResetQueue");
			function Pn(e) {
				return e === DataView;
			}
			n$1(Pn, "isDataViewConstructor");
			function yi(e) {
				return Pn(e.constructor);
			}
			n$1(yi, "isDataView");
			function gi(e) {
				return Pn(e) ? 1 : e.BYTES_PER_ELEMENT;
			}
			n$1(gi, "arrayBufferViewElementSize");
			class ve {
				static {
					n$1(this, "ReadableStreamBYOBRequest");
				}
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get view() {
					if (!Tr(this)) throw Ar("view");
					return this._view;
				}
				respond(t$1) {
					if (!Tr(this)) throw Ar("respond");
					if (le(t$1, 1, "respond"), t$1 = mr(t$1, "First parameter"), this._associatedReadableByteStreamController === void 0) throw new TypeError("This BYOB request has been invalidated");
					if (_e(this._view.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be used as a response");
					Ct(this._associatedReadableByteStreamController, t$1);
				}
				respondWithNewView(t$1) {
					if (!Tr(this)) throw Ar("respondWithNewView");
					if (le(t$1, 1, "respondWithNewView"), !ArrayBuffer.isView(t$1)) throw new TypeError("You can only respond with array buffer views");
					if (this._associatedReadableByteStreamController === void 0) throw new TypeError("This BYOB request has been invalidated");
					if (_e(t$1.buffer)) throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
					Pt(this._associatedReadableByteStreamController, t$1);
				}
			}
			Object.defineProperties(ve.prototype, {
				respond: { enumerable: !0 },
				respondWithNewView: { enumerable: !0 },
				view: { enumerable: !0 }
			}), h(ve.prototype.respond, "respond"), h(ve.prototype.respondWithNewView, "respondWithNewView"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ve.prototype, Symbol.toStringTag, {
				value: "ReadableStreamBYOBRequest",
				configurable: !0
			});
			class ce {
				static {
					n$1(this, "ReadableByteStreamController");
				}
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get byobRequest() {
					if (!Ae(this)) throw nt("byobRequest");
					return vr(this);
				}
				get desiredSize() {
					if (!Ae(this)) throw nt("desiredSize");
					return Fn(this);
				}
				close() {
					if (!Ae(this)) throw nt("close");
					if (this._closeRequested) throw new TypeError("The stream has already been closed; do not close it again!");
					const t$1 = this._controlledReadableByteStream._state;
					if (t$1 !== "readable") throw new TypeError(`The stream (in ${t$1} state) is not in the readable state and cannot be closed`);
					rt(this);
				}
				enqueue(t$1) {
					if (!Ae(this)) throw nt("enqueue");
					if (le(t$1, 1, "enqueue"), !ArrayBuffer.isView(t$1)) throw new TypeError("chunk must be an array buffer view");
					if (t$1.byteLength === 0) throw new TypeError("chunk must have non-zero byteLength");
					if (t$1.buffer.byteLength === 0) throw new TypeError("chunk's buffer must have non-zero byteLength");
					if (this._closeRequested) throw new TypeError("stream is closed or draining");
					const r = this._controlledReadableByteStream._state;
					if (r !== "readable") throw new TypeError(`The stream (in ${r} state) is not in the readable state and cannot be enqueued to`);
					Tt(this, t$1);
				}
				error(t$1 = void 0) {
					if (!Ae(this)) throw nt("error");
					Z(this, t$1);
				}
				[ar](t$1) {
					En(this), Se(this);
					const r = this._cancelAlgorithm(t$1);
					return Rt(this), r;
				}
				[sr](t$1) {
					const r = this._controlledReadableByteStream;
					if (this._queueTotalSize > 0) {
						In(this, t$1);
						return;
					}
					const s = this._autoAllocateChunkSize;
					if (s !== void 0) {
						let f$1;
						try {
							f$1 = new ArrayBuffer(s);
						} catch (d) {
							t$1._errorSteps(d);
							return;
						}
						const c = {
							buffer: f$1,
							bufferByteLength: s,
							byteOffset: 0,
							byteLength: s,
							bytesFilled: 0,
							minimumFill: 1,
							elementSize: 1,
							viewConstructor: Uint8Array,
							readerType: "default"
						};
						this._pendingPullIntos.push(c);
					}
					hn(r, t$1), Be(this);
				}
				[ur]() {
					if (this._pendingPullIntos.length > 0) {
						const t$1 = this._pendingPullIntos.peek();
						t$1.readerType = "none", this._pendingPullIntos = new M(), this._pendingPullIntos.push(t$1);
					}
				}
			}
			Object.defineProperties(ce.prototype, {
				close: { enumerable: !0 },
				enqueue: { enumerable: !0 },
				error: { enumerable: !0 },
				byobRequest: { enumerable: !0 },
				desiredSize: { enumerable: !0 }
			}), h(ce.prototype.close, "close"), h(ce.prototype.enqueue, "enqueue"), h(ce.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ce.prototype, Symbol.toStringTag, {
				value: "ReadableByteStreamController",
				configurable: !0
			});
			function Ae(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableByteStream") ? !1 : e instanceof ce;
			}
			n$1(Ae, "IsReadableByteStreamController");
			function Tr(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_associatedReadableByteStreamController") ? !1 : e instanceof ve;
			}
			n$1(Tr, "IsReadableStreamBYOBRequest");
			function Be(e) {
				if (!Ti(e)) return;
				if (e._pulling) {
					e._pullAgain = !0;
					return;
				}
				e._pulling = !0;
				const r = e._pullAlgorithm();
				g(r, () => (e._pulling = !1, e._pullAgain && (e._pullAgain = !1, Be(e)), null), (s) => (Z(e, s), null));
			}
			n$1(Be, "ReadableByteStreamControllerCallPullIfNeeded");
			function En(e) {
				Pr(e), e._pendingPullIntos = new M();
			}
			n$1(En, "ReadableByteStreamControllerClearPendingPullIntos");
			function Cr(e, t$1) {
				let r = !1;
				e._state === "closed" && (r = !0);
				const s = vn(t$1);
				t$1.readerType === "default" ? pr(e, s, r) : Bi(e, s, r);
			}
			n$1(Cr, "ReadableByteStreamControllerCommitPullIntoDescriptor");
			function vn(e) {
				const t$1 = e.bytesFilled, r = e.elementSize;
				return new e.viewConstructor(e.buffer, e.byteOffset, t$1 / r);
			}
			n$1(vn, "ReadableByteStreamControllerConvertPullIntoDescriptor");
			function wt(e, t$1, r, s) {
				e._queue.push({
					buffer: t$1,
					byteOffset: r,
					byteLength: s
				}), e._queueTotalSize += s;
			}
			n$1(wt, "ReadableByteStreamControllerEnqueueChunkToQueue");
			function An(e, t$1, r, s) {
				let f$1;
				try {
					f$1 = Rn(t$1, r, r + s);
				} catch (c) {
					throw Z(e, c), c;
				}
				wt(e, f$1, 0, s);
			}
			n$1(An, "ReadableByteStreamControllerEnqueueClonedChunkToQueue");
			function Bn(e, t$1) {
				t$1.bytesFilled > 0 && An(e, t$1.buffer, t$1.byteOffset, t$1.bytesFilled), je(e);
			}
			n$1(Bn, "ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue");
			function Wn(e, t$1) {
				const r = Math.min(e._queueTotalSize, t$1.byteLength - t$1.bytesFilled), s = t$1.bytesFilled + r;
				let f$1 = r, c = !1;
				const d = s % t$1.elementSize, p = s - d;
				p >= t$1.minimumFill && (f$1 = p - t$1.bytesFilled, c = !0);
				const R = e._queue;
				for (; f$1 > 0;) {
					const y = R.peek(), C = Math.min(f$1, y.byteLength), P = t$1.byteOffset + t$1.bytesFilled;
					wn(t$1.buffer, P, y.buffer, y.byteOffset, C), y.byteLength === C ? R.shift() : (y.byteOffset += C, y.byteLength -= C), e._queueTotalSize -= C, kn(e, C, t$1), f$1 -= C;
				}
				return c;
			}
			n$1(Wn, "ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");
			function kn(e, t$1, r) {
				r.bytesFilled += t$1;
			}
			n$1(kn, "ReadableByteStreamControllerFillHeadPullIntoDescriptor");
			function qn(e) {
				e._queueTotalSize === 0 && e._closeRequested ? (Rt(e), lt(e._controlledReadableByteStream)) : Be(e);
			}
			n$1(qn, "ReadableByteStreamControllerHandleQueueDrain");
			function Pr(e) {
				e._byobRequest !== null && (e._byobRequest._associatedReadableByteStreamController = void 0, e._byobRequest._view = null, e._byobRequest = null);
			}
			n$1(Pr, "ReadableByteStreamControllerInvalidateBYOBRequest");
			function Er(e) {
				for (; e._pendingPullIntos.length > 0;) {
					if (e._queueTotalSize === 0) return;
					const t$1 = e._pendingPullIntos.peek();
					Wn(e, t$1) && (je(e), Cr(e._controlledReadableByteStream, t$1));
				}
			}
			n$1(Er, "ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");
			function _i(e) {
				const t$1 = e._controlledReadableByteStream._reader;
				for (; t$1._readRequests.length > 0;) {
					if (e._queueTotalSize === 0) return;
					const r = t$1._readRequests.shift();
					In(e, r);
				}
			}
			n$1(_i, "ReadableByteStreamControllerProcessReadRequestsUsingQueue");
			function Si(e, t$1, r, s) {
				const f$1 = e._controlledReadableByteStream, c = t$1.constructor, d = gi(c), { byteOffset: p, byteLength: R } = t$1, y = r * d;
				let C;
				try {
					C = fe(t$1.buffer);
				} catch (B) {
					s._errorSteps(B);
					return;
				}
				const P = {
					buffer: C,
					bufferByteLength: C.byteLength,
					byteOffset: p,
					byteLength: R,
					bytesFilled: 0,
					minimumFill: y,
					elementSize: d,
					viewConstructor: c,
					readerType: "byob"
				};
				if (e._pendingPullIntos.length > 0) {
					e._pendingPullIntos.push(P), Ln(f$1, s);
					return;
				}
				if (f$1._state === "closed") {
					const B = new c(P.buffer, P.byteOffset, 0);
					s._closeSteps(B);
					return;
				}
				if (e._queueTotalSize > 0) {
					if (Wn(e, P)) {
						const B = vn(P);
						qn(e), s._chunkSteps(B);
						return;
					}
					if (e._closeRequested) {
						const B = new TypeError("Insufficient bytes to fill elements in the given buffer");
						Z(e, B), s._errorSteps(B);
						return;
					}
				}
				e._pendingPullIntos.push(P), Ln(f$1, s), Be(e);
			}
			n$1(Si, "ReadableByteStreamControllerPullInto");
			function wi(e, t$1) {
				t$1.readerType === "none" && je(e);
				const r = e._controlledReadableByteStream;
				if (Br(r)) for (; Dn(r) > 0;) {
					const s = je(e);
					Cr(r, s);
				}
			}
			n$1(wi, "ReadableByteStreamControllerRespondInClosedState");
			function Ri(e, t$1, r) {
				if (kn(e, t$1, r), r.readerType === "none") {
					Bn(e, r), Er(e);
					return;
				}
				if (r.bytesFilled < r.minimumFill) return;
				je(e);
				const s = r.bytesFilled % r.elementSize;
				if (s > 0) {
					const f$1 = r.byteOffset + r.bytesFilled;
					An(e, r.buffer, f$1 - s, s);
				}
				r.bytesFilled -= s, Cr(e._controlledReadableByteStream, r), Er(e);
			}
			n$1(Ri, "ReadableByteStreamControllerRespondInReadableState");
			function On(e, t$1) {
				const r = e._pendingPullIntos.peek();
				Pr(e), e._controlledReadableByteStream._state === "closed" ? wi(e, r) : Ri(e, t$1, r), Be(e);
			}
			n$1(On, "ReadableByteStreamControllerRespondInternal");
			function je(e) {
				return e._pendingPullIntos.shift();
			}
			n$1(je, "ReadableByteStreamControllerShiftPendingPullInto");
			function Ti(e) {
				const t$1 = e._controlledReadableByteStream;
				return t$1._state !== "readable" || e._closeRequested || !e._started ? !1 : !!(mn(t$1) && gt(t$1) > 0 || Br(t$1) && Dn(t$1) > 0 || Fn(e) > 0);
			}
			n$1(Ti, "ReadableByteStreamControllerShouldCallPull");
			function Rt(e) {
				e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0;
			}
			n$1(Rt, "ReadableByteStreamControllerClearAlgorithms");
			function rt(e) {
				const t$1 = e._controlledReadableByteStream;
				if (!(e._closeRequested || t$1._state !== "readable")) {
					if (e._queueTotalSize > 0) {
						e._closeRequested = !0;
						return;
					}
					if (e._pendingPullIntos.length > 0) {
						const r = e._pendingPullIntos.peek();
						if (r.bytesFilled % r.elementSize !== 0) {
							const s = new TypeError("Insufficient bytes to fill elements in the given buffer");
							throw Z(e, s), s;
						}
					}
					Rt(e), lt(t$1);
				}
			}
			n$1(rt, "ReadableByteStreamControllerClose");
			function Tt(e, t$1) {
				const r = e._controlledReadableByteStream;
				if (e._closeRequested || r._state !== "readable") return;
				const { buffer: s, byteOffset: f$1, byteLength: c } = t$1;
				if (_e(s)) throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
				const d = fe(s);
				if (e._pendingPullIntos.length > 0) {
					const p = e._pendingPullIntos.peek();
					if (_e(p.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
					Pr(e), p.buffer = fe(p.buffer), p.readerType === "none" && Bn(e, p);
				}
				if (mn(r)) if (_i(e), gt(r) === 0) wt(e, d, f$1, c);
				else {
					e._pendingPullIntos.length > 0 && je(e);
					const p = new Uint8Array(d, f$1, c);
					pr(r, p, !1);
				}
				else Br(r) ? (wt(e, d, f$1, c), Er(e)) : wt(e, d, f$1, c);
				Be(e);
			}
			n$1(Tt, "ReadableByteStreamControllerEnqueue");
			function Z(e, t$1) {
				const r = e._controlledReadableByteStream;
				r._state === "readable" && (En(e), Se(e), Rt(e), lo(r, t$1));
			}
			n$1(Z, "ReadableByteStreamControllerError");
			function In(e, t$1) {
				const r = e._queue.shift();
				e._queueTotalSize -= r.byteLength, qn(e);
				const s = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
				t$1._chunkSteps(s);
			}
			n$1(In, "ReadableByteStreamControllerFillReadRequestFromQueue");
			function vr(e) {
				if (e._byobRequest === null && e._pendingPullIntos.length > 0) {
					const t$1 = e._pendingPullIntos.peek(), r = new Uint8Array(t$1.buffer, t$1.byteOffset + t$1.bytesFilled, t$1.byteLength - t$1.bytesFilled), s = Object.create(ve.prototype);
					Pi(s, e, r), e._byobRequest = s;
				}
				return e._byobRequest;
			}
			n$1(vr, "ReadableByteStreamControllerGetBYOBRequest");
			function Fn(e) {
				const t$1 = e._controlledReadableByteStream._state;
				return t$1 === "errored" ? null : t$1 === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
			}
			n$1(Fn, "ReadableByteStreamControllerGetDesiredSize");
			function Ct(e, t$1) {
				const r = e._pendingPullIntos.peek();
				if (e._controlledReadableByteStream._state === "closed") {
					if (t$1 !== 0) throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
				} else {
					if (t$1 === 0) throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
					if (r.bytesFilled + t$1 > r.byteLength) throw new RangeError("bytesWritten out of range");
				}
				r.buffer = fe(r.buffer), On(e, t$1);
			}
			n$1(Ct, "ReadableByteStreamControllerRespond");
			function Pt(e, t$1) {
				const r = e._pendingPullIntos.peek();
				if (e._controlledReadableByteStream._state === "closed") {
					if (t$1.byteLength !== 0) throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
				} else if (t$1.byteLength === 0) throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
				if (r.byteOffset + r.bytesFilled !== t$1.byteOffset) throw new RangeError("The region specified by view does not match byobRequest");
				if (r.bufferByteLength !== t$1.buffer.byteLength) throw new RangeError("The buffer of view has different capacity than byobRequest");
				if (r.bytesFilled + t$1.byteLength > r.byteLength) throw new RangeError("The region specified by view is larger than byobRequest");
				const f$1 = t$1.byteLength;
				r.buffer = fe(t$1.buffer), On(e, f$1);
			}
			n$1(Pt, "ReadableByteStreamControllerRespondWithNewView");
			function zn(e, t$1, r, s, f$1, c, d) {
				t$1._controlledReadableByteStream = e, t$1._pullAgain = !1, t$1._pulling = !1, t$1._byobRequest = null, t$1._queue = t$1._queueTotalSize = void 0, Se(t$1), t$1._closeRequested = !1, t$1._started = !1, t$1._strategyHWM = c, t$1._pullAlgorithm = s, t$1._cancelAlgorithm = f$1, t$1._autoAllocateChunkSize = d, t$1._pendingPullIntos = new M(), e._readableStreamController = t$1;
				const p = r();
				g(T(p), () => (t$1._started = !0, Be(t$1), null), (R) => (Z(t$1, R), null));
			}
			n$1(zn, "SetUpReadableByteStreamController");
			function Ci(e, t$1, r) {
				const s = Object.create(ce.prototype);
				let f$1, c, d;
				t$1.start !== void 0 ? f$1 = n$1(() => t$1.start(s), "startAlgorithm") : f$1 = n$1(() => {}, "startAlgorithm"), t$1.pull !== void 0 ? c = n$1(() => t$1.pull(s), "pullAlgorithm") : c = n$1(() => T(void 0), "pullAlgorithm"), t$1.cancel !== void 0 ? d = n$1((R) => t$1.cancel(R), "cancelAlgorithm") : d = n$1(() => T(void 0), "cancelAlgorithm");
				const p = t$1.autoAllocateChunkSize;
				if (p === 0) throw new TypeError("autoAllocateChunkSize must be greater than 0");
				zn(e, s, f$1, c, d, r, p);
			}
			n$1(Ci, "SetUpReadableByteStreamControllerFromUnderlyingSource");
			function Pi(e, t$1, r) {
				e._associatedReadableByteStreamController = t$1, e._view = r;
			}
			n$1(Pi, "SetUpReadableStreamBYOBRequest");
			function Ar(e) {
				return new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`);
			}
			n$1(Ar, "byobRequestBrandCheckException");
			function nt(e) {
				return new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`);
			}
			n$1(nt, "byteStreamControllerBrandCheckException");
			function Ei(e, t$1) {
				ne(e, t$1);
				const r = e?.mode;
				return { mode: r === void 0 ? void 0 : vi(r, `${t$1} has member 'mode' that`) };
			}
			n$1(Ei, "convertReaderOptions");
			function vi(e, t$1) {
				if (e = `${e}`, e !== "byob") throw new TypeError(`${t$1} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);
				return e;
			}
			n$1(vi, "convertReadableStreamReaderMode");
			function Ai(e, t$1) {
				var r;
				ne(e, t$1);
				const s = (r = e?.min) !== null && r !== void 0 ? r : 1;
				return { min: mr(s, `${t$1} has member 'min' that`) };
			}
			n$1(Ai, "convertByobReadOptions");
			function jn(e) {
				return new we(e);
			}
			n$1(jn, "AcquireReadableStreamBYOBReader");
			function Ln(e, t$1) {
				e._reader._readIntoRequests.push(t$1);
			}
			n$1(Ln, "ReadableStreamAddReadIntoRequest");
			function Bi(e, t$1, r) {
				const f$1 = e._reader._readIntoRequests.shift();
				r ? f$1._closeSteps(t$1) : f$1._chunkSteps(t$1);
			}
			n$1(Bi, "ReadableStreamFulfillReadIntoRequest");
			function Dn(e) {
				return e._reader._readIntoRequests.length;
			}
			n$1(Dn, "ReadableStreamGetNumReadIntoRequests");
			function Br(e) {
				const t$1 = e._reader;
				return !(t$1 === void 0 || !We(t$1));
			}
			n$1(Br, "ReadableStreamHasBYOBReader");
			class we {
				static {
					n$1(this, "ReadableStreamBYOBReader");
				}
				constructor(t$1) {
					if (le(t$1, 1, "ReadableStreamBYOBReader"), br(t$1, "First parameter"), Ce(t$1)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
					if (!Ae(t$1._readableStreamController)) throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
					sn(this, t$1), this._readIntoRequests = new M();
				}
				get closed() {
					return We(this) ? this._closedPromise : b(Et("closed"));
				}
				cancel(t$1 = void 0) {
					return We(this) ? this._ownerReadableStream === void 0 ? b(yt("cancel")) : lr(this, t$1) : b(Et("cancel"));
				}
				read(t$1, r = {}) {
					if (!We(this)) return b(Et("read"));
					if (!ArrayBuffer.isView(t$1)) return b(new TypeError("view must be an array buffer view"));
					if (t$1.byteLength === 0) return b(new TypeError("view must have non-zero byteLength"));
					if (t$1.buffer.byteLength === 0) return b(new TypeError("view's buffer must have non-zero byteLength"));
					if (_e(t$1.buffer)) return b(new TypeError("view's buffer has been detached"));
					let s;
					try {
						s = Ai(r, "options");
					} catch (y) {
						return b(y);
					}
					const f$1 = s.min;
					if (f$1 === 0) return b(new TypeError("options.min must be greater than 0"));
					if (yi(t$1)) {
						if (f$1 > t$1.byteLength) return b(new RangeError("options.min must be less than or equal to view's byteLength"));
					} else if (f$1 > t$1.length) return b(new RangeError("options.min must be less than or equal to view's length"));
					if (this._ownerReadableStream === void 0) return b(yt("read from"));
					let c, d;
					const p = A((y, C) => {
						c = y, d = C;
					});
					return $n(this, t$1, f$1, {
						_chunkSteps: n$1((y) => c({
							value: y,
							done: !1
						}), "_chunkSteps"),
						_closeSteps: n$1((y) => c({
							value: y,
							done: !0
						}), "_closeSteps"),
						_errorSteps: n$1((y) => d(y), "_errorSteps")
					}), p;
				}
				releaseLock() {
					if (!We(this)) throw Et("releaseLock");
					this._ownerReadableStream !== void 0 && Wi(this);
				}
			}
			Object.defineProperties(we.prototype, {
				cancel: { enumerable: !0 },
				read: { enumerable: !0 },
				releaseLock: { enumerable: !0 },
				closed: { enumerable: !0 }
			}), h(we.prototype.cancel, "cancel"), h(we.prototype.read, "read"), h(we.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(we.prototype, Symbol.toStringTag, {
				value: "ReadableStreamBYOBReader",
				configurable: !0
			});
			function We(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_readIntoRequests") ? !1 : e instanceof we;
			}
			n$1(We, "IsReadableStreamBYOBReader");
			function $n(e, t$1, r, s) {
				const f$1 = e._ownerReadableStream;
				f$1._disturbed = !0, f$1._state === "errored" ? s._errorSteps(f$1._storedError) : Si(f$1._readableStreamController, t$1, r, s);
			}
			n$1($n, "ReadableStreamBYOBReaderRead");
			function Wi(e) {
				ue(e);
				const t$1 = new TypeError("Reader was released");
				Mn(e, t$1);
			}
			n$1(Wi, "ReadableStreamBYOBReaderRelease");
			function Mn(e, t$1) {
				const r = e._readIntoRequests;
				e._readIntoRequests = new M(), r.forEach((s) => {
					s._errorSteps(t$1);
				});
			}
			n$1(Mn, "ReadableStreamBYOBReaderErrorReadIntoRequests");
			function Et(e) {
				return new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`);
			}
			n$1(Et, "byobReaderBrandCheckException");
			function ot(e, t$1) {
				const { highWaterMark: r } = e;
				if (r === void 0) return t$1;
				if (Sn(r) || r < 0) throw new RangeError("Invalid highWaterMark");
				return r;
			}
			n$1(ot, "ExtractHighWaterMark");
			function vt(e) {
				const { size: t$1 } = e;
				return t$1 || (() => 1);
			}
			n$1(vt, "ExtractSizeAlgorithm");
			function At(e, t$1) {
				ne(e, t$1);
				const r = e?.highWaterMark, s = e?.size;
				return {
					highWaterMark: r === void 0 ? void 0 : hr(r),
					size: s === void 0 ? void 0 : ki(s, `${t$1} has member 'size' that`)
				};
			}
			n$1(At, "convertQueuingStrategy");
			function ki(e, t$1) {
				return G(e, t$1), (r) => hr(e(r));
			}
			n$1(ki, "convertQueuingStrategySize");
			function qi(e, t$1) {
				ne(e, t$1);
				const r = e?.abort, s = e?.close, f$1 = e?.start, c = e?.type, d = e?.write;
				return {
					abort: r === void 0 ? void 0 : Oi(r, e, `${t$1} has member 'abort' that`),
					close: s === void 0 ? void 0 : Ii(s, e, `${t$1} has member 'close' that`),
					start: f$1 === void 0 ? void 0 : Fi(f$1, e, `${t$1} has member 'start' that`),
					write: d === void 0 ? void 0 : zi(d, e, `${t$1} has member 'write' that`),
					type: c
				};
			}
			n$1(qi, "convertUnderlyingSink");
			function Oi(e, t$1, r) {
				return G(e, r), (s) => z(e, t$1, [s]);
			}
			n$1(Oi, "convertUnderlyingSinkAbortCallback");
			function Ii(e, t$1, r) {
				return G(e, r), () => z(e, t$1, []);
			}
			n$1(Ii, "convertUnderlyingSinkCloseCallback");
			function Fi(e, t$1, r) {
				return G(e, r), (s) => O(e, t$1, [s]);
			}
			n$1(Fi, "convertUnderlyingSinkStartCallback");
			function zi(e, t$1, r) {
				return G(e, r), (s, f$1) => z(e, t$1, [s, f$1]);
			}
			n$1(zi, "convertUnderlyingSinkWriteCallback");
			function Un(e, t$1) {
				if (!Le(e)) throw new TypeError(`${t$1} is not a WritableStream.`);
			}
			n$1(Un, "assertWritableStream");
			function ji(e) {
				if (typeof e != "object" || e === null) return !1;
				try {
					return typeof e.aborted == "boolean";
				} catch {
					return !1;
				}
			}
			n$1(ji, "isAbortSignal");
			const Li = typeof AbortController == "function";
			function Di() {
				if (Li) return new AbortController();
			}
			n$1(Di, "createAbortController");
			class Re {
				static {
					n$1(this, "WritableStream");
				}
				constructor(t$1 = {}, r = {}) {
					t$1 === void 0 ? t$1 = null : cn(t$1, "First parameter");
					const s = At(r, "Second parameter"), f$1 = qi(t$1, "First parameter");
					if (Nn(this), f$1.type !== void 0) throw new RangeError("Invalid type is specified");
					const d = vt(s), p = ot(s, 1);
					Xi(this, f$1, p, d);
				}
				get locked() {
					if (!Le(this)) throw Ot("locked");
					return De(this);
				}
				abort(t$1 = void 0) {
					return Le(this) ? De(this) ? b(new TypeError("Cannot abort a stream that already has a writer")) : Bt(this, t$1) : b(Ot("abort"));
				}
				close() {
					return Le(this) ? De(this) ? b(new TypeError("Cannot close a stream that already has a writer")) : oe(this) ? b(new TypeError("Cannot close an already-closing stream")) : Hn(this) : b(Ot("close"));
				}
				getWriter() {
					if (!Le(this)) throw Ot("getWriter");
					return xn(this);
				}
			}
			Object.defineProperties(Re.prototype, {
				abort: { enumerable: !0 },
				close: { enumerable: !0 },
				getWriter: { enumerable: !0 },
				locked: { enumerable: !0 }
			}), h(Re.prototype.abort, "abort"), h(Re.prototype.close, "close"), h(Re.prototype.getWriter, "getWriter"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Re.prototype, Symbol.toStringTag, {
				value: "WritableStream",
				configurable: !0
			});
			function xn(e) {
				return new de(e);
			}
			n$1(xn, "AcquireWritableStreamDefaultWriter");
			function $i(e, t$1, r, s, f$1 = 1, c = () => 1) {
				const d = Object.create(Re.prototype);
				Nn(d);
				const p = Object.create($e.prototype);
				return Kn(d, p, e, t$1, r, s, f$1, c), d;
			}
			n$1($i, "CreateWritableStream");
			function Nn(e) {
				e._state = "writable", e._storedError = void 0, e._writer = void 0, e._writableStreamController = void 0, e._writeRequests = new M(), e._inFlightWriteRequest = void 0, e._closeRequest = void 0, e._inFlightCloseRequest = void 0, e._pendingAbortRequest = void 0, e._backpressure = !1;
			}
			n$1(Nn, "InitializeWritableStream");
			function Le(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_writableStreamController") ? !1 : e instanceof Re;
			}
			n$1(Le, "IsWritableStream");
			function De(e) {
				return e._writer !== void 0;
			}
			n$1(De, "IsWritableStreamLocked");
			function Bt(e, t$1) {
				var r;
				if (e._state === "closed" || e._state === "errored") return T(void 0);
				e._writableStreamController._abortReason = t$1, (r = e._writableStreamController._abortController) === null || r === void 0 || r.abort(t$1);
				const s = e._state;
				if (s === "closed" || s === "errored") return T(void 0);
				if (e._pendingAbortRequest !== void 0) return e._pendingAbortRequest._promise;
				let f$1 = !1;
				s === "erroring" && (f$1 = !0, t$1 = void 0);
				const c = A((d, p) => {
					e._pendingAbortRequest = {
						_promise: void 0,
						_resolve: d,
						_reject: p,
						_reason: t$1,
						_wasAlreadyErroring: f$1
					};
				});
				return e._pendingAbortRequest._promise = c, f$1 || kr(e, t$1), c;
			}
			n$1(Bt, "WritableStreamAbort");
			function Hn(e) {
				const t$1 = e._state;
				if (t$1 === "closed" || t$1 === "errored") return b(new TypeError(`The stream (in ${t$1} state) is not in the writable state and cannot be closed`));
				const r = A((f$1, c) => {
					const d = {
						_resolve: f$1,
						_reject: c
					};
					e._closeRequest = d;
				}), s = e._writer;
				return s !== void 0 && e._backpressure && t$1 === "writable" && Dr(s), ea(e._writableStreamController), r;
			}
			n$1(Hn, "WritableStreamClose");
			function Mi(e) {
				return A((r, s) => {
					const f$1 = {
						_resolve: r,
						_reject: s
					};
					e._writeRequests.push(f$1);
				});
			}
			n$1(Mi, "WritableStreamAddWriteRequest");
			function Wr(e, t$1) {
				if (e._state === "writable") {
					kr(e, t$1);
					return;
				}
				qr(e);
			}
			n$1(Wr, "WritableStreamDealWithRejection");
			function kr(e, t$1) {
				const r = e._writableStreamController;
				e._state = "erroring", e._storedError = t$1;
				const s = e._writer;
				s !== void 0 && Qn(s, t$1), !Vi(e) && r._started && qr(e);
			}
			n$1(kr, "WritableStreamStartErroring");
			function qr(e) {
				e._state = "errored", e._writableStreamController[an]();
				const t$1 = e._storedError;
				if (e._writeRequests.forEach((f$1) => {
					f$1._reject(t$1);
				}), e._writeRequests = new M(), e._pendingAbortRequest === void 0) {
					Wt(e);
					return;
				}
				const r = e._pendingAbortRequest;
				if (e._pendingAbortRequest = void 0, r._wasAlreadyErroring) {
					r._reject(t$1), Wt(e);
					return;
				}
				const s = e._writableStreamController[pt](r._reason);
				g(s, () => (r._resolve(), Wt(e), null), (f$1) => (r._reject(f$1), Wt(e), null));
			}
			n$1(qr, "WritableStreamFinishErroring");
			function Ui(e) {
				e._inFlightWriteRequest._resolve(void 0), e._inFlightWriteRequest = void 0;
			}
			n$1(Ui, "WritableStreamFinishInFlightWrite");
			function xi(e, t$1) {
				e._inFlightWriteRequest._reject(t$1), e._inFlightWriteRequest = void 0, Wr(e, t$1);
			}
			n$1(xi, "WritableStreamFinishInFlightWriteWithError");
			function Ni(e) {
				e._inFlightCloseRequest._resolve(void 0), e._inFlightCloseRequest = void 0, e._state === "erroring" && (e._storedError = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._resolve(), e._pendingAbortRequest = void 0)), e._state = "closed";
				const r = e._writer;
				r !== void 0 && to(r);
			}
			n$1(Ni, "WritableStreamFinishInFlightClose");
			function Hi(e, t$1) {
				e._inFlightCloseRequest._reject(t$1), e._inFlightCloseRequest = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._reject(t$1), e._pendingAbortRequest = void 0), Wr(e, t$1);
			}
			n$1(Hi, "WritableStreamFinishInFlightCloseWithError");
			function oe(e) {
				return !(e._closeRequest === void 0 && e._inFlightCloseRequest === void 0);
			}
			n$1(oe, "WritableStreamCloseQueuedOrInFlight");
			function Vi(e) {
				return !(e._inFlightWriteRequest === void 0 && e._inFlightCloseRequest === void 0);
			}
			n$1(Vi, "WritableStreamHasOperationMarkedInFlight");
			function Qi(e) {
				e._inFlightCloseRequest = e._closeRequest, e._closeRequest = void 0;
			}
			n$1(Qi, "WritableStreamMarkCloseRequestInFlight");
			function Yi(e) {
				e._inFlightWriteRequest = e._writeRequests.shift();
			}
			n$1(Yi, "WritableStreamMarkFirstWriteRequestInFlight");
			function Wt(e) {
				e._closeRequest !== void 0 && (e._closeRequest._reject(e._storedError), e._closeRequest = void 0);
				const t$1 = e._writer;
				t$1 !== void 0 && jr(t$1, e._storedError);
			}
			n$1(Wt, "WritableStreamRejectCloseAndClosedPromiseIfNeeded");
			function Or(e, t$1) {
				const r = e._writer;
				r !== void 0 && t$1 !== e._backpressure && (t$1 ? sa(r) : Dr(r)), e._backpressure = t$1;
			}
			n$1(Or, "WritableStreamUpdateBackpressure");
			class de {
				static {
					n$1(this, "WritableStreamDefaultWriter");
				}
				constructor(t$1) {
					if (le(t$1, 1, "WritableStreamDefaultWriter"), Un(t$1, "First parameter"), De(t$1)) throw new TypeError("This stream has already been locked for exclusive writing by another writer");
					this._ownerWritableStream = t$1, t$1._writer = this;
					const r = t$1._state;
					if (r === "writable") !oe(t$1) && t$1._backpressure ? Ft(this) : ro(this), It(this);
					else if (r === "erroring") Lr(this, t$1._storedError), It(this);
					else if (r === "closed") ro(this), ia(this);
					else {
						const s = t$1._storedError;
						Lr(this, s), eo(this, s);
					}
				}
				get closed() {
					return ke(this) ? this._closedPromise : b(qe("closed"));
				}
				get desiredSize() {
					if (!ke(this)) throw qe("desiredSize");
					if (this._ownerWritableStream === void 0) throw at("desiredSize");
					return Ji(this);
				}
				get ready() {
					return ke(this) ? this._readyPromise : b(qe("ready"));
				}
				abort(t$1 = void 0) {
					return ke(this) ? this._ownerWritableStream === void 0 ? b(at("abort")) : Gi(this, t$1) : b(qe("abort"));
				}
				close() {
					if (!ke(this)) return b(qe("close"));
					const t$1 = this._ownerWritableStream;
					return t$1 === void 0 ? b(at("close")) : oe(t$1) ? b(new TypeError("Cannot close an already-closing stream")) : Vn(this);
				}
				releaseLock() {
					if (!ke(this)) throw qe("releaseLock");
					this._ownerWritableStream !== void 0 && Yn(this);
				}
				write(t$1 = void 0) {
					return ke(this) ? this._ownerWritableStream === void 0 ? b(at("write to")) : Gn(this, t$1) : b(qe("write"));
				}
			}
			Object.defineProperties(de.prototype, {
				abort: { enumerable: !0 },
				close: { enumerable: !0 },
				releaseLock: { enumerable: !0 },
				write: { enumerable: !0 },
				closed: { enumerable: !0 },
				desiredSize: { enumerable: !0 },
				ready: { enumerable: !0 }
			}), h(de.prototype.abort, "abort"), h(de.prototype.close, "close"), h(de.prototype.releaseLock, "releaseLock"), h(de.prototype.write, "write"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(de.prototype, Symbol.toStringTag, {
				value: "WritableStreamDefaultWriter",
				configurable: !0
			});
			function ke(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream") ? !1 : e instanceof de;
			}
			n$1(ke, "IsWritableStreamDefaultWriter");
			function Gi(e, t$1) {
				const r = e._ownerWritableStream;
				return Bt(r, t$1);
			}
			n$1(Gi, "WritableStreamDefaultWriterAbort");
			function Vn(e) {
				const t$1 = e._ownerWritableStream;
				return Hn(t$1);
			}
			n$1(Vn, "WritableStreamDefaultWriterClose");
			function Zi(e) {
				const t$1 = e._ownerWritableStream, r = t$1._state;
				return oe(t$1) || r === "closed" ? T(void 0) : r === "errored" ? b(t$1._storedError) : Vn(e);
			}
			n$1(Zi, "WritableStreamDefaultWriterCloseWithErrorPropagation");
			function Ki(e, t$1) {
				e._closedPromiseState === "pending" ? jr(e, t$1) : aa(e, t$1);
			}
			n$1(Ki, "WritableStreamDefaultWriterEnsureClosedPromiseRejected");
			function Qn(e, t$1) {
				e._readyPromiseState === "pending" ? no(e, t$1) : ua(e, t$1);
			}
			n$1(Qn, "WritableStreamDefaultWriterEnsureReadyPromiseRejected");
			function Ji(e) {
				const t$1 = e._ownerWritableStream, r = t$1._state;
				return r === "errored" || r === "erroring" ? null : r === "closed" ? 0 : Jn(t$1._writableStreamController);
			}
			n$1(Ji, "WritableStreamDefaultWriterGetDesiredSize");
			function Yn(e) {
				const t$1 = e._ownerWritableStream, r = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
				Qn(e, r), Ki(e, r), t$1._writer = void 0, e._ownerWritableStream = void 0;
			}
			n$1(Yn, "WritableStreamDefaultWriterRelease");
			function Gn(e, t$1) {
				const r = e._ownerWritableStream, s = r._writableStreamController, f$1 = ta(s, t$1);
				if (r !== e._ownerWritableStream) return b(at("write to"));
				const c = r._state;
				if (c === "errored") return b(r._storedError);
				if (oe(r) || c === "closed") return b(new TypeError("The stream is closing or closed and cannot be written to"));
				if (c === "erroring") return b(r._storedError);
				const d = Mi(r);
				return ra(s, t$1, f$1), d;
			}
			n$1(Gn, "WritableStreamDefaultWriterWrite");
			const Zn = {};
			class $e {
				static {
					n$1(this, "WritableStreamDefaultController");
				}
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get abortReason() {
					if (!Ir(this)) throw zr("abortReason");
					return this._abortReason;
				}
				get signal() {
					if (!Ir(this)) throw zr("signal");
					if (this._abortController === void 0) throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
					return this._abortController.signal;
				}
				error(t$1 = void 0) {
					if (!Ir(this)) throw zr("error");
					this._controlledWritableStream._state === "writable" && Xn(this, t$1);
				}
				[pt](t$1) {
					const r = this._abortAlgorithm(t$1);
					return kt(this), r;
				}
				[an]() {
					Se(this);
				}
			}
			Object.defineProperties($e.prototype, {
				abortReason: { enumerable: !0 },
				signal: { enumerable: !0 },
				error: { enumerable: !0 }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty($e.prototype, Symbol.toStringTag, {
				value: "WritableStreamDefaultController",
				configurable: !0
			});
			function Ir(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledWritableStream") ? !1 : e instanceof $e;
			}
			n$1(Ir, "IsWritableStreamDefaultController");
			function Kn(e, t$1, r, s, f$1, c, d, p) {
				t$1._controlledWritableStream = e, e._writableStreamController = t$1, t$1._queue = void 0, t$1._queueTotalSize = void 0, Se(t$1), t$1._abortReason = void 0, t$1._abortController = Di(), t$1._started = !1, t$1._strategySizeAlgorithm = p, t$1._strategyHWM = d, t$1._writeAlgorithm = s, t$1._closeAlgorithm = f$1, t$1._abortAlgorithm = c;
				const R = Fr(t$1);
				Or(e, R);
				const y = r(), C = T(y);
				g(C, () => (t$1._started = !0, qt(t$1), null), (P) => (t$1._started = !0, Wr(e, P), null));
			}
			n$1(Kn, "SetUpWritableStreamDefaultController");
			function Xi(e, t$1, r, s) {
				const f$1 = Object.create($e.prototype);
				let c, d, p, R;
				t$1.start !== void 0 ? c = n$1(() => t$1.start(f$1), "startAlgorithm") : c = n$1(() => {}, "startAlgorithm"), t$1.write !== void 0 ? d = n$1((y) => t$1.write(y, f$1), "writeAlgorithm") : d = n$1(() => T(void 0), "writeAlgorithm"), t$1.close !== void 0 ? p = n$1(() => t$1.close(), "closeAlgorithm") : p = n$1(() => T(void 0), "closeAlgorithm"), t$1.abort !== void 0 ? R = n$1((y) => t$1.abort(y), "abortAlgorithm") : R = n$1(() => T(void 0), "abortAlgorithm"), Kn(e, f$1, c, d, p, R, r, s);
			}
			n$1(Xi, "SetUpWritableStreamDefaultControllerFromUnderlyingSink");
			function kt(e) {
				e._writeAlgorithm = void 0, e._closeAlgorithm = void 0, e._abortAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
			}
			n$1(kt, "WritableStreamDefaultControllerClearAlgorithms");
			function ea(e) {
				Rr(e, Zn, 0), qt(e);
			}
			n$1(ea, "WritableStreamDefaultControllerClose");
			function ta(e, t$1) {
				try {
					return e._strategySizeAlgorithm(t$1);
				} catch (r) {
					return it(e, r), 1;
				}
			}
			n$1(ta, "WritableStreamDefaultControllerGetChunkSize");
			function Jn(e) {
				return e._strategyHWM - e._queueTotalSize;
			}
			n$1(Jn, "WritableStreamDefaultControllerGetDesiredSize");
			function ra(e, t$1, r) {
				try {
					Rr(e, t$1, r);
				} catch (f$1) {
					it(e, f$1);
					return;
				}
				const s = e._controlledWritableStream;
				if (!oe(s) && s._state === "writable") {
					const f$1 = Fr(e);
					Or(s, f$1);
				}
				qt(e);
			}
			n$1(ra, "WritableStreamDefaultControllerWrite");
			function qt(e) {
				const t$1 = e._controlledWritableStream;
				if (!e._started || t$1._inFlightWriteRequest !== void 0) return;
				if (t$1._state === "erroring") {
					qr(t$1);
					return;
				}
				if (e._queue.length === 0) return;
				const s = pi(e);
				s === Zn ? na(e) : oa(e, s);
			}
			n$1(qt, "WritableStreamDefaultControllerAdvanceQueueIfNeeded");
			function it(e, t$1) {
				e._controlledWritableStream._state === "writable" && Xn(e, t$1);
			}
			n$1(it, "WritableStreamDefaultControllerErrorIfNeeded");
			function na(e) {
				const t$1 = e._controlledWritableStream;
				Qi(t$1), wr(e);
				const r = e._closeAlgorithm();
				kt(e), g(r, () => (Ni(t$1), null), (s) => (Hi(t$1, s), null));
			}
			n$1(na, "WritableStreamDefaultControllerProcessClose");
			function oa(e, t$1) {
				const r = e._controlledWritableStream;
				Yi(r);
				const s = e._writeAlgorithm(t$1);
				g(s, () => {
					Ui(r);
					const f$1 = r._state;
					if (wr(e), !oe(r) && f$1 === "writable") {
						const c = Fr(e);
						Or(r, c);
					}
					return qt(e), null;
				}, (f$1) => (r._state === "writable" && kt(e), xi(r, f$1), null));
			}
			n$1(oa, "WritableStreamDefaultControllerProcessWrite");
			function Fr(e) {
				return Jn(e) <= 0;
			}
			n$1(Fr, "WritableStreamDefaultControllerGetBackpressure");
			function Xn(e, t$1) {
				const r = e._controlledWritableStream;
				kt(e), kr(r, t$1);
			}
			n$1(Xn, "WritableStreamDefaultControllerError");
			function Ot(e) {
				return new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`);
			}
			n$1(Ot, "streamBrandCheckException$2");
			function zr(e) {
				return new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`);
			}
			n$1(zr, "defaultControllerBrandCheckException$2");
			function qe(e) {
				return new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`);
			}
			n$1(qe, "defaultWriterBrandCheckException");
			function at(e) {
				return new TypeError("Cannot " + e + " a stream using a released writer");
			}
			n$1(at, "defaultWriterLockException");
			function It(e) {
				e._closedPromise = A((t$1, r) => {
					e._closedPromise_resolve = t$1, e._closedPromise_reject = r, e._closedPromiseState = "pending";
				});
			}
			n$1(It, "defaultWriterClosedPromiseInitialize");
			function eo(e, t$1) {
				It(e), jr(e, t$1);
			}
			n$1(eo, "defaultWriterClosedPromiseInitializeAsRejected");
			function ia(e) {
				It(e), to(e);
			}
			n$1(ia, "defaultWriterClosedPromiseInitializeAsResolved");
			function jr(e, t$1) {
				e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t$1), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected");
			}
			n$1(jr, "defaultWriterClosedPromiseReject");
			function aa(e, t$1) {
				eo(e, t$1);
			}
			n$1(aa, "defaultWriterClosedPromiseResetToRejected");
			function to(e) {
				e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved");
			}
			n$1(to, "defaultWriterClosedPromiseResolve");
			function Ft(e) {
				e._readyPromise = A((t$1, r) => {
					e._readyPromise_resolve = t$1, e._readyPromise_reject = r;
				}), e._readyPromiseState = "pending";
			}
			n$1(Ft, "defaultWriterReadyPromiseInitialize");
			function Lr(e, t$1) {
				Ft(e), no(e, t$1);
			}
			n$1(Lr, "defaultWriterReadyPromiseInitializeAsRejected");
			function ro(e) {
				Ft(e), Dr(e);
			}
			n$1(ro, "defaultWriterReadyPromiseInitializeAsResolved");
			function no(e, t$1) {
				e._readyPromise_reject !== void 0 && (Q(e._readyPromise), e._readyPromise_reject(t$1), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected");
			}
			n$1(no, "defaultWriterReadyPromiseReject");
			function sa(e) {
				Ft(e);
			}
			n$1(sa, "defaultWriterReadyPromiseReset");
			function ua(e, t$1) {
				Lr(e, t$1);
			}
			n$1(ua, "defaultWriterReadyPromiseResetToRejected");
			function Dr(e) {
				e._readyPromise_resolve !== void 0 && (e._readyPromise_resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled");
			}
			n$1(Dr, "defaultWriterReadyPromiseResolve");
			function la() {
				if (typeof globalThis < "u") return globalThis;
				if (typeof self < "u") return self;
				if (typeof n < "u") return n;
			}
			n$1(la, "getGlobals");
			const $r = la();
			function fa(e) {
				if (!(typeof e == "function" || typeof e == "object") || e.name !== "DOMException") return !1;
				try {
					return new e(), !0;
				} catch {
					return !1;
				}
			}
			n$1(fa, "isDOMExceptionConstructor");
			function ca() {
				const e = $r?.DOMException;
				return fa(e) ? e : void 0;
			}
			n$1(ca, "getFromGlobal");
			function da() {
				const e = n$1(function(r, s) {
					this.message = r || "", this.name = s || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
				}, "DOMException");
				return h(e, "DOMException"), e.prototype = Object.create(Error.prototype), Object.defineProperty(e.prototype, "constructor", {
					value: e,
					writable: !0,
					configurable: !0
				}), e;
			}
			n$1(da, "createPolyfill");
			const ha = ca() || da();
			function oo(e, t$1, r, s, f$1, c) {
				const d = ze(e), p = xn(t$1);
				e._disturbed = !0;
				let R = !1, y = T(void 0);
				return A((C, P) => {
					let B;
					if (c !== void 0) {
						if (B = n$1(() => {
							const _ = c.reason !== void 0 ? c.reason : new ha("Aborted", "AbortError"), v = [];
							s || v.push(() => t$1._state === "writable" ? Bt(t$1, _) : T(void 0)), f$1 || v.push(() => e._state === "readable" ? X(e, _) : T(void 0)), x(() => Promise.all(v.map((W) => W())), !0, _);
						}, "abortAlgorithm"), c.aborted) {
							B();
							return;
						}
						c.addEventListener("abort", B);
					}
					function ee() {
						return A((_, v) => {
							function W(Y) {
								Y ? _() : q(Ne(), W, v);
							}
							n$1(W, "next"), W(!1);
						});
					}
					n$1(ee, "pipeLoop");
					function Ne() {
						return R ? T(!0) : q(p._readyPromise, () => A((_, v) => {
							et(d, {
								_chunkSteps: n$1((W) => {
									y = q(Gn(p, W), void 0, l), _(!1);
								}, "_chunkSteps"),
								_closeSteps: n$1(() => _(!0), "_closeSteps"),
								_errorSteps: v
							});
						}));
					}
					if (n$1(Ne, "pipeStep"), me(e, d._closedPromise, (_) => (s ? K(!0, _) : x(() => Bt(t$1, _), !0, _), null)), me(t$1, p._closedPromise, (_) => (f$1 ? K(!0, _) : x(() => X(e, _), !0, _), null)), U(e, d._closedPromise, () => (r ? K() : x(() => Zi(p)), null)), oe(t$1) || t$1._state === "closed") {
						const _ = new TypeError("the destination writable stream closed before all data could be piped to it");
						f$1 ? K(!0, _) : x(() => X(e, _), !0, _);
					}
					Q(ee());
					function Ee() {
						const _ = y;
						return q(y, () => _ !== y ? Ee() : void 0);
					}
					n$1(Ee, "waitForWritesToFinish");
					function me(_, v, W) {
						_._state === "errored" ? W(_._storedError) : I(v, W);
					}
					n$1(me, "isOrBecomesErrored");
					function U(_, v, W) {
						_._state === "closed" ? W() : V(v, W);
					}
					n$1(U, "isOrBecomesClosed");
					function x(_, v, W) {
						if (R) return;
						R = !0, t$1._state === "writable" && !oe(t$1) ? V(Ee(), Y) : Y();
						function Y() {
							return g(_(), () => be(v, W), (He) => be(!0, He)), null;
						}
						n$1(Y, "doTheRest");
					}
					n$1(x, "shutdownWithAction");
					function K(_, v) {
						R || (R = !0, t$1._state === "writable" && !oe(t$1) ? V(Ee(), () => be(_, v)) : be(_, v));
					}
					n$1(K, "shutdown");
					function be(_, v) {
						return Yn(p), ue(d), c !== void 0 && c.removeEventListener("abort", B), _ ? P(v) : C(void 0), null;
					}
					n$1(be, "finalize");
				});
			}
			n$1(oo, "ReadableStreamPipeTo");
			class he {
				static {
					n$1(this, "ReadableStreamDefaultController");
				}
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get desiredSize() {
					if (!zt(this)) throw Lt("desiredSize");
					return Mr(this);
				}
				close() {
					if (!zt(this)) throw Lt("close");
					if (!Ue(this)) throw new TypeError("The stream is not in a state that permits close");
					Oe(this);
				}
				enqueue(t$1 = void 0) {
					if (!zt(this)) throw Lt("enqueue");
					if (!Ue(this)) throw new TypeError("The stream is not in a state that permits enqueue");
					return Me(this, t$1);
				}
				error(t$1 = void 0) {
					if (!zt(this)) throw Lt("error");
					J(this, t$1);
				}
				[ar](t$1) {
					Se(this);
					const r = this._cancelAlgorithm(t$1);
					return jt(this), r;
				}
				[sr](t$1) {
					const r = this._controlledReadableStream;
					if (this._queue.length > 0) {
						const s = wr(this);
						this._closeRequested && this._queue.length === 0 ? (jt(this), lt(r)) : st(this), t$1._chunkSteps(s);
					} else hn(r, t$1), st(this);
				}
				[ur]() {}
			}
			Object.defineProperties(he.prototype, {
				close: { enumerable: !0 },
				enqueue: { enumerable: !0 },
				error: { enumerable: !0 },
				desiredSize: { enumerable: !0 }
			}), h(he.prototype.close, "close"), h(he.prototype.enqueue, "enqueue"), h(he.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(he.prototype, Symbol.toStringTag, {
				value: "ReadableStreamDefaultController",
				configurable: !0
			});
			function zt(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableStream") ? !1 : e instanceof he;
			}
			n$1(zt, "IsReadableStreamDefaultController");
			function st(e) {
				if (!io(e)) return;
				if (e._pulling) {
					e._pullAgain = !0;
					return;
				}
				e._pulling = !0;
				const r = e._pullAlgorithm();
				g(r, () => (e._pulling = !1, e._pullAgain && (e._pullAgain = !1, st(e)), null), (s) => (J(e, s), null));
			}
			n$1(st, "ReadableStreamDefaultControllerCallPullIfNeeded");
			function io(e) {
				const t$1 = e._controlledReadableStream;
				return !Ue(e) || !e._started ? !1 : !!(Ce(t$1) && gt(t$1) > 0 || Mr(e) > 0);
			}
			n$1(io, "ReadableStreamDefaultControllerShouldCallPull");
			function jt(e) {
				e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
			}
			n$1(jt, "ReadableStreamDefaultControllerClearAlgorithms");
			function Oe(e) {
				if (!Ue(e)) return;
				const t$1 = e._controlledReadableStream;
				e._closeRequested = !0, e._queue.length === 0 && (jt(e), lt(t$1));
			}
			n$1(Oe, "ReadableStreamDefaultControllerClose");
			function Me(e, t$1) {
				if (!Ue(e)) return;
				const r = e._controlledReadableStream;
				if (Ce(r) && gt(r) > 0) pr(r, t$1, !1);
				else {
					let s;
					try {
						s = e._strategySizeAlgorithm(t$1);
					} catch (f$1) {
						throw J(e, f$1), f$1;
					}
					try {
						Rr(e, t$1, s);
					} catch (f$1) {
						throw J(e, f$1), f$1;
					}
				}
				st(e);
			}
			n$1(Me, "ReadableStreamDefaultControllerEnqueue");
			function J(e, t$1) {
				const r = e._controlledReadableStream;
				r._state === "readable" && (Se(e), jt(e), lo(r, t$1));
			}
			n$1(J, "ReadableStreamDefaultControllerError");
			function Mr(e) {
				const t$1 = e._controlledReadableStream._state;
				return t$1 === "errored" ? null : t$1 === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
			}
			n$1(Mr, "ReadableStreamDefaultControllerGetDesiredSize");
			function ma(e) {
				return !io(e);
			}
			n$1(ma, "ReadableStreamDefaultControllerHasBackpressure");
			function Ue(e) {
				const t$1 = e._controlledReadableStream._state;
				return !e._closeRequested && t$1 === "readable";
			}
			n$1(Ue, "ReadableStreamDefaultControllerCanCloseOrEnqueue");
			function ao(e, t$1, r, s, f$1, c, d) {
				t$1._controlledReadableStream = e, t$1._queue = void 0, t$1._queueTotalSize = void 0, Se(t$1), t$1._started = !1, t$1._closeRequested = !1, t$1._pullAgain = !1, t$1._pulling = !1, t$1._strategySizeAlgorithm = d, t$1._strategyHWM = c, t$1._pullAlgorithm = s, t$1._cancelAlgorithm = f$1, e._readableStreamController = t$1;
				const p = r();
				g(T(p), () => (t$1._started = !0, st(t$1), null), (R) => (J(t$1, R), null));
			}
			n$1(ao, "SetUpReadableStreamDefaultController");
			function ba(e, t$1, r, s) {
				const f$1 = Object.create(he.prototype);
				let c, d, p;
				t$1.start !== void 0 ? c = n$1(() => t$1.start(f$1), "startAlgorithm") : c = n$1(() => {}, "startAlgorithm"), t$1.pull !== void 0 ? d = n$1(() => t$1.pull(f$1), "pullAlgorithm") : d = n$1(() => T(void 0), "pullAlgorithm"), t$1.cancel !== void 0 ? p = n$1((R) => t$1.cancel(R), "cancelAlgorithm") : p = n$1(() => T(void 0), "cancelAlgorithm"), ao(e, f$1, c, d, p, r, s);
			}
			n$1(ba, "SetUpReadableStreamDefaultControllerFromUnderlyingSource");
			function Lt(e) {
				return new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`);
			}
			n$1(Lt, "defaultControllerBrandCheckException$1");
			function pa(e, t$1) {
				return Ae(e._readableStreamController) ? ga(e) : ya(e);
			}
			n$1(pa, "ReadableStreamTee");
			function ya(e, t$1) {
				const r = ze(e);
				let s = !1, f$1 = !1, c = !1, d = !1, p, R, y, C, P;
				const B = A((U) => {
					P = U;
				});
				function ee() {
					return s ? (f$1 = !0, T(void 0)) : (s = !0, et(r, {
						_chunkSteps: n$1((x) => {
							se(() => {
								f$1 = !1;
								const K = x, be = x;
								c || Me(y._readableStreamController, K), d || Me(C._readableStreamController, be), s = !1, f$1 && ee();
							});
						}, "_chunkSteps"),
						_closeSteps: n$1(() => {
							s = !1, c || Oe(y._readableStreamController), d || Oe(C._readableStreamController), (!c || !d) && P(void 0);
						}, "_closeSteps"),
						_errorSteps: n$1(() => {
							s = !1;
						}, "_errorSteps")
					}), T(void 0));
				}
				n$1(ee, "pullAlgorithm");
				function Ne(U) {
					if (c = !0, p = U, d) {
						const x = tt([p, R]), K = X(e, x);
						P(K);
					}
					return B;
				}
				n$1(Ne, "cancel1Algorithm");
				function Ee(U) {
					if (d = !0, R = U, c) {
						const x = tt([p, R]), K = X(e, x);
						P(K);
					}
					return B;
				}
				n$1(Ee, "cancel2Algorithm");
				function me() {}
				return n$1(me, "startAlgorithm"), y = ut(me, ee, Ne), C = ut(me, ee, Ee), I(r._closedPromise, (U) => (J(y._readableStreamController, U), J(C._readableStreamController, U), (!c || !d) && P(void 0), null)), [y, C];
			}
			n$1(ya, "ReadableStreamDefaultTee");
			function ga(e) {
				let t$1 = ze(e), r = !1, s = !1, f$1 = !1, c = !1, d = !1, p, R, y, C, P;
				const B = A((_) => {
					P = _;
				});
				function ee(_) {
					I(_._closedPromise, (v) => (_ !== t$1 || (Z(y._readableStreamController, v), Z(C._readableStreamController, v), (!c || !d) && P(void 0)), null));
				}
				n$1(ee, "forwardReaderError");
				function Ne() {
					We(t$1) && (ue(t$1), t$1 = ze(e), ee(t$1)), et(t$1, {
						_chunkSteps: n$1((v) => {
							se(() => {
								s = !1, f$1 = !1;
								const W = v;
								let Y = v;
								if (!c && !d) try {
									Y = Cn(v);
								} catch (He) {
									Z(y._readableStreamController, He), Z(C._readableStreamController, He), P(X(e, He));
									return;
								}
								c || Tt(y._readableStreamController, W), d || Tt(C._readableStreamController, Y), r = !1, s ? me() : f$1 && U();
							});
						}, "_chunkSteps"),
						_closeSteps: n$1(() => {
							r = !1, c || rt(y._readableStreamController), d || rt(C._readableStreamController), y._readableStreamController._pendingPullIntos.length > 0 && Ct(y._readableStreamController, 0), C._readableStreamController._pendingPullIntos.length > 0 && Ct(C._readableStreamController, 0), (!c || !d) && P(void 0);
						}, "_closeSteps"),
						_errorSteps: n$1(() => {
							r = !1;
						}, "_errorSteps")
					});
				}
				n$1(Ne, "pullWithDefaultReader");
				function Ee(_, v) {
					ge(t$1) && (ue(t$1), t$1 = jn(e), ee(t$1));
					const W = v ? C : y, Y = v ? y : C;
					$n(t$1, _, 1, {
						_chunkSteps: n$1((Ve) => {
							se(() => {
								s = !1, f$1 = !1;
								const Qe = v ? d : c;
								if (v ? c : d) Qe || Pt(W._readableStreamController, Ve);
								else {
									let To;
									try {
										To = Cn(Ve);
									} catch (Vr) {
										Z(W._readableStreamController, Vr), Z(Y._readableStreamController, Vr), P(X(e, Vr));
										return;
									}
									Qe || Pt(W._readableStreamController, Ve), Tt(Y._readableStreamController, To);
								}
								r = !1, s ? me() : f$1 && U();
							});
						}, "_chunkSteps"),
						_closeSteps: n$1((Ve) => {
							r = !1;
							const Qe = v ? d : c, Vt = v ? c : d;
							Qe || rt(W._readableStreamController), Vt || rt(Y._readableStreamController), Ve !== void 0 && (Qe || Pt(W._readableStreamController, Ve), !Vt && Y._readableStreamController._pendingPullIntos.length > 0 && Ct(Y._readableStreamController, 0)), (!Qe || !Vt) && P(void 0);
						}, "_closeSteps"),
						_errorSteps: n$1(() => {
							r = !1;
						}, "_errorSteps")
					});
				}
				n$1(Ee, "pullWithBYOBReader");
				function me() {
					if (r) return s = !0, T(void 0);
					r = !0;
					const _ = vr(y._readableStreamController);
					return _ === null ? Ne() : Ee(_._view, !1), T(void 0);
				}
				n$1(me, "pull1Algorithm");
				function U() {
					if (r) return f$1 = !0, T(void 0);
					r = !0;
					const _ = vr(C._readableStreamController);
					return _ === null ? Ne() : Ee(_._view, !0), T(void 0);
				}
				n$1(U, "pull2Algorithm");
				function x(_) {
					if (c = !0, p = _, d) {
						const v = tt([p, R]), W = X(e, v);
						P(W);
					}
					return B;
				}
				n$1(x, "cancel1Algorithm");
				function K(_) {
					if (d = !0, R = _, c) {
						const v = tt([p, R]), W = X(e, v);
						P(W);
					}
					return B;
				}
				n$1(K, "cancel2Algorithm");
				function be() {}
				return n$1(be, "startAlgorithm"), y = uo(be, me, x), C = uo(be, U, K), ee(t$1), [y, C];
			}
			n$1(ga, "ReadableByteStreamTee");
			function _a(e) {
				return u(e) && typeof e.getReader < "u";
			}
			n$1(_a, "isReadableStreamLike");
			function Sa(e) {
				return _a(e) ? Ra(e.getReader()) : wa(e);
			}
			n$1(Sa, "ReadableStreamFrom");
			function wa(e) {
				let t$1;
				const r = Tn(e, "async"), s = l;
				function f$1() {
					let d;
					try {
						d = di(r);
					} catch (R) {
						return b(R);
					}
					const p = T(d);
					return F(p, (R) => {
						if (!u(R)) throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
						if (hi(R)) Oe(t$1._readableStreamController);
						else {
							const C = mi(R);
							Me(t$1._readableStreamController, C);
						}
					});
				}
				n$1(f$1, "pullAlgorithm");
				function c(d) {
					const p = r.iterator;
					let R;
					try {
						R = St(p, "return");
					} catch (P) {
						return b(P);
					}
					if (R === void 0) return T(void 0);
					let y;
					try {
						y = O(R, p, [d]);
					} catch (P) {
						return b(P);
					}
					const C = T(y);
					return F(C, (P) => {
						if (!u(P)) throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
					});
				}
				return n$1(c, "cancelAlgorithm"), t$1 = ut(s, f$1, c, 0), t$1;
			}
			n$1(wa, "ReadableStreamFromIterable");
			function Ra(e) {
				let t$1;
				const r = l;
				function s() {
					let c;
					try {
						c = e.read();
					} catch (d) {
						return b(d);
					}
					return F(c, (d) => {
						if (!u(d)) throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
						if (d.done) Oe(t$1._readableStreamController);
						else {
							const p = d.value;
							Me(t$1._readableStreamController, p);
						}
					});
				}
				n$1(s, "pullAlgorithm");
				function f$1(c) {
					try {
						return T(e.cancel(c));
					} catch (d) {
						return b(d);
					}
				}
				return n$1(f$1, "cancelAlgorithm"), t$1 = ut(r, s, f$1, 0), t$1;
			}
			n$1(Ra, "ReadableStreamFromDefaultReader");
			function Ta(e, t$1) {
				ne(e, t$1);
				const r = e, s = r?.autoAllocateChunkSize, f$1 = r?.cancel, c = r?.pull, d = r?.start, p = r?.type;
				return {
					autoAllocateChunkSize: s === void 0 ? void 0 : mr(s, `${t$1} has member 'autoAllocateChunkSize' that`),
					cancel: f$1 === void 0 ? void 0 : Ca(f$1, r, `${t$1} has member 'cancel' that`),
					pull: c === void 0 ? void 0 : Pa(c, r, `${t$1} has member 'pull' that`),
					start: d === void 0 ? void 0 : Ea(d, r, `${t$1} has member 'start' that`),
					type: p === void 0 ? void 0 : va(p, `${t$1} has member 'type' that`)
				};
			}
			n$1(Ta, "convertUnderlyingDefaultOrByteSource");
			function Ca(e, t$1, r) {
				return G(e, r), (s) => z(e, t$1, [s]);
			}
			n$1(Ca, "convertUnderlyingSourceCancelCallback");
			function Pa(e, t$1, r) {
				return G(e, r), (s) => z(e, t$1, [s]);
			}
			n$1(Pa, "convertUnderlyingSourcePullCallback");
			function Ea(e, t$1, r) {
				return G(e, r), (s) => O(e, t$1, [s]);
			}
			n$1(Ea, "convertUnderlyingSourceStartCallback");
			function va(e, t$1) {
				if (e = `${e}`, e !== "bytes") throw new TypeError(`${t$1} '${e}' is not a valid enumeration value for ReadableStreamType`);
				return e;
			}
			n$1(va, "convertReadableStreamType");
			function Aa(e, t$1) {
				return ne(e, t$1), { preventCancel: !!e?.preventCancel };
			}
			n$1(Aa, "convertIteratorOptions");
			function so(e, t$1) {
				ne(e, t$1);
				const r = e?.preventAbort, s = e?.preventCancel, f$1 = e?.preventClose, c = e?.signal;
				return c !== void 0 && Ba(c, `${t$1} has member 'signal' that`), {
					preventAbort: !!r,
					preventCancel: !!s,
					preventClose: !!f$1,
					signal: c
				};
			}
			n$1(so, "convertPipeOptions");
			function Ba(e, t$1) {
				if (!ji(e)) throw new TypeError(`${t$1} is not an AbortSignal.`);
			}
			n$1(Ba, "assertAbortSignal");
			function Wa(e, t$1) {
				ne(e, t$1);
				const r = e?.readable;
				dr(r, "readable", "ReadableWritablePair"), br(r, `${t$1} has member 'readable' that`);
				const s = e?.writable;
				return dr(s, "writable", "ReadableWritablePair"), Un(s, `${t$1} has member 'writable' that`), {
					readable: r,
					writable: s
				};
			}
			n$1(Wa, "convertReadableWritablePair");
			class L {
				static {
					n$1(this, "ReadableStream");
				}
				constructor(t$1 = {}, r = {}) {
					t$1 === void 0 ? t$1 = null : cn(t$1, "First parameter");
					const s = At(r, "Second parameter"), f$1 = Ta(t$1, "First parameter");
					if (Ur(this), f$1.type === "bytes") {
						if (s.size !== void 0) throw new RangeError("The strategy for a byte stream cannot have a size function");
						const c = ot(s, 0);
						Ci(this, f$1, c);
					} else {
						const c = vt(s), d = ot(s, 1);
						ba(this, f$1, d, c);
					}
				}
				get locked() {
					if (!Te(this)) throw Ie("locked");
					return Ce(this);
				}
				cancel(t$1 = void 0) {
					return Te(this) ? Ce(this) ? b(new TypeError("Cannot cancel a stream that already has a reader")) : X(this, t$1) : b(Ie("cancel"));
				}
				getReader(t$1 = void 0) {
					if (!Te(this)) throw Ie("getReader");
					return Ei(t$1, "First parameter").mode === void 0 ? ze(this) : jn(this);
				}
				pipeThrough(t$1, r = {}) {
					if (!Te(this)) throw Ie("pipeThrough");
					le(t$1, 1, "pipeThrough");
					const s = Wa(t$1, "First parameter"), f$1 = so(r, "Second parameter");
					if (Ce(this)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
					if (De(s.writable)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
					const c = oo(this, s.writable, f$1.preventClose, f$1.preventAbort, f$1.preventCancel, f$1.signal);
					return Q(c), s.readable;
				}
				pipeTo(t$1, r = {}) {
					if (!Te(this)) return b(Ie("pipeTo"));
					if (t$1 === void 0) return b("Parameter 1 is required in 'pipeTo'.");
					if (!Le(t$1)) return b(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
					let s;
					try {
						s = so(r, "Second parameter");
					} catch (f$1) {
						return b(f$1);
					}
					return Ce(this) ? b(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : De(t$1) ? b(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : oo(this, t$1, s.preventClose, s.preventAbort, s.preventCancel, s.signal);
				}
				tee() {
					if (!Te(this)) throw Ie("tee");
					const t$1 = pa(this);
					return tt(t$1);
				}
				values(t$1 = void 0) {
					if (!Te(this)) throw Ie("values");
					const r = Aa(t$1, "First parameter");
					return fi(this, r.preventCancel);
				}
				[Sr](t$1) {
					return this.values(t$1);
				}
				static from(t$1) {
					return Sa(t$1);
				}
			}
			Object.defineProperties(L, { from: { enumerable: !0 } }), Object.defineProperties(L.prototype, {
				cancel: { enumerable: !0 },
				getReader: { enumerable: !0 },
				pipeThrough: { enumerable: !0 },
				pipeTo: { enumerable: !0 },
				tee: { enumerable: !0 },
				values: { enumerable: !0 },
				locked: { enumerable: !0 }
			}), h(L.from, "from"), h(L.prototype.cancel, "cancel"), h(L.prototype.getReader, "getReader"), h(L.prototype.pipeThrough, "pipeThrough"), h(L.prototype.pipeTo, "pipeTo"), h(L.prototype.tee, "tee"), h(L.prototype.values, "values"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(L.prototype, Symbol.toStringTag, {
				value: "ReadableStream",
				configurable: !0
			}), Object.defineProperty(L.prototype, Sr, {
				value: L.prototype.values,
				writable: !0,
				configurable: !0
			});
			function ut(e, t$1, r, s = 1, f$1 = () => 1) {
				const c = Object.create(L.prototype);
				Ur(c);
				const d = Object.create(he.prototype);
				return ao(c, d, e, t$1, r, s, f$1), c;
			}
			n$1(ut, "CreateReadableStream");
			function uo(e, t$1, r) {
				const s = Object.create(L.prototype);
				Ur(s);
				const f$1 = Object.create(ce.prototype);
				return zn(s, f$1, e, t$1, r, 0, void 0), s;
			}
			n$1(uo, "CreateReadableByteStream");
			function Ur(e) {
				e._state = "readable", e._reader = void 0, e._storedError = void 0, e._disturbed = !1;
			}
			n$1(Ur, "InitializeReadableStream");
			function Te(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_readableStreamController") ? !1 : e instanceof L;
			}
			n$1(Te, "IsReadableStream");
			function Ce(e) {
				return e._reader !== void 0;
			}
			n$1(Ce, "IsReadableStreamLocked");
			function X(e, t$1) {
				if (e._disturbed = !0, e._state === "closed") return T(void 0);
				if (e._state === "errored") return b(e._storedError);
				lt(e);
				const r = e._reader;
				if (r !== void 0 && We(r)) {
					const f$1 = r._readIntoRequests;
					r._readIntoRequests = new M(), f$1.forEach((c) => {
						c._closeSteps(void 0);
					});
				}
				const s = e._readableStreamController[ar](t$1);
				return F(s, l);
			}
			n$1(X, "ReadableStreamCancel");
			function lt(e) {
				e._state = "closed";
				const t$1 = e._reader;
				if (t$1 !== void 0 && (ln(t$1), ge(t$1))) {
					const r = t$1._readRequests;
					t$1._readRequests = new M(), r.forEach((s) => {
						s._closeSteps();
					});
				}
			}
			n$1(lt, "ReadableStreamClose");
			function lo(e, t$1) {
				e._state = "errored", e._storedError = t$1;
				const r = e._reader;
				r !== void 0 && (cr(r, t$1), ge(r) ? bn(r, t$1) : Mn(r, t$1));
			}
			n$1(lo, "ReadableStreamError");
			function Ie(e) {
				return new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`);
			}
			n$1(Ie, "streamBrandCheckException$1");
			function fo(e, t$1) {
				ne(e, t$1);
				const r = e?.highWaterMark;
				return dr(r, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: hr(r) };
			}
			n$1(fo, "convertQueuingStrategyInit");
			const co = n$1((e) => e.byteLength, "byteLengthSizeFunction");
			h(co, "size");
			class Dt {
				static {
					n$1(this, "ByteLengthQueuingStrategy");
				}
				constructor(t$1) {
					le(t$1, 1, "ByteLengthQueuingStrategy"), t$1 = fo(t$1, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = t$1.highWaterMark;
				}
				get highWaterMark() {
					if (!mo(this)) throw ho("highWaterMark");
					return this._byteLengthQueuingStrategyHighWaterMark;
				}
				get size() {
					if (!mo(this)) throw ho("size");
					return co;
				}
			}
			Object.defineProperties(Dt.prototype, {
				highWaterMark: { enumerable: !0 },
				size: { enumerable: !0 }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Dt.prototype, Symbol.toStringTag, {
				value: "ByteLengthQueuingStrategy",
				configurable: !0
			});
			function ho(e) {
				return new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`);
			}
			n$1(ho, "byteLengthBrandCheckException");
			function mo(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_byteLengthQueuingStrategyHighWaterMark") ? !1 : e instanceof Dt;
			}
			n$1(mo, "IsByteLengthQueuingStrategy");
			const bo = n$1(() => 1, "countSizeFunction");
			h(bo, "size");
			class $t {
				static {
					n$1(this, "CountQueuingStrategy");
				}
				constructor(t$1) {
					le(t$1, 1, "CountQueuingStrategy"), t$1 = fo(t$1, "First parameter"), this._countQueuingStrategyHighWaterMark = t$1.highWaterMark;
				}
				get highWaterMark() {
					if (!yo(this)) throw po("highWaterMark");
					return this._countQueuingStrategyHighWaterMark;
				}
				get size() {
					if (!yo(this)) throw po("size");
					return bo;
				}
			}
			Object.defineProperties($t.prototype, {
				highWaterMark: { enumerable: !0 },
				size: { enumerable: !0 }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty($t.prototype, Symbol.toStringTag, {
				value: "CountQueuingStrategy",
				configurable: !0
			});
			function po(e) {
				return new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`);
			}
			n$1(po, "countBrandCheckException");
			function yo(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_countQueuingStrategyHighWaterMark") ? !1 : e instanceof $t;
			}
			n$1(yo, "IsCountQueuingStrategy");
			function ka(e, t$1) {
				ne(e, t$1);
				const r = e?.cancel, s = e?.flush, f$1 = e?.readableType, c = e?.start, d = e?.transform, p = e?.writableType;
				return {
					cancel: r === void 0 ? void 0 : Fa(r, e, `${t$1} has member 'cancel' that`),
					flush: s === void 0 ? void 0 : qa(s, e, `${t$1} has member 'flush' that`),
					readableType: f$1,
					start: c === void 0 ? void 0 : Oa(c, e, `${t$1} has member 'start' that`),
					transform: d === void 0 ? void 0 : Ia(d, e, `${t$1} has member 'transform' that`),
					writableType: p
				};
			}
			n$1(ka, "convertTransformer");
			function qa(e, t$1, r) {
				return G(e, r), (s) => z(e, t$1, [s]);
			}
			n$1(qa, "convertTransformerFlushCallback");
			function Oa(e, t$1, r) {
				return G(e, r), (s) => O(e, t$1, [s]);
			}
			n$1(Oa, "convertTransformerStartCallback");
			function Ia(e, t$1, r) {
				return G(e, r), (s, f$1) => z(e, t$1, [s, f$1]);
			}
			n$1(Ia, "convertTransformerTransformCallback");
			function Fa(e, t$1, r) {
				return G(e, r), (s) => z(e, t$1, [s]);
			}
			n$1(Fa, "convertTransformerCancelCallback");
			class Mt {
				static {
					n$1(this, "TransformStream");
				}
				constructor(t$1 = {}, r = {}, s = {}) {
					t$1 === void 0 && (t$1 = null);
					const f$1 = At(r, "Second parameter"), c = At(s, "Third parameter"), d = ka(t$1, "First parameter");
					if (d.readableType !== void 0) throw new RangeError("Invalid readableType specified");
					if (d.writableType !== void 0) throw new RangeError("Invalid writableType specified");
					const p = ot(c, 0), R = vt(c), y = ot(f$1, 1), C = vt(f$1);
					let P;
					const B = A((ee) => {
						P = ee;
					});
					za(this, B, y, C, p, R), La(this, d), d.start !== void 0 ? P(d.start(this._transformStreamController)) : P(void 0);
				}
				get readable() {
					if (!go(this)) throw Ro("readable");
					return this._readable;
				}
				get writable() {
					if (!go(this)) throw Ro("writable");
					return this._writable;
				}
			}
			Object.defineProperties(Mt.prototype, {
				readable: { enumerable: !0 },
				writable: { enumerable: !0 }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Mt.prototype, Symbol.toStringTag, {
				value: "TransformStream",
				configurable: !0
			});
			function za(e, t$1, r, s, f$1, c) {
				function d() {
					return t$1;
				}
				n$1(d, "startAlgorithm");
				function p(B) {
					return Ma(e, B);
				}
				n$1(p, "writeAlgorithm");
				function R(B) {
					return Ua(e, B);
				}
				n$1(R, "abortAlgorithm");
				function y() {
					return xa(e);
				}
				n$1(y, "closeAlgorithm"), e._writable = $i(d, p, y, R, r, s);
				function C() {
					return Na(e);
				}
				n$1(C, "pullAlgorithm");
				function P(B) {
					return Ha(e, B);
				}
				n$1(P, "cancelAlgorithm"), e._readable = ut(d, C, P, f$1, c), e._backpressure = void 0, e._backpressureChangePromise = void 0, e._backpressureChangePromise_resolve = void 0, Ut(e, !0), e._transformStreamController = void 0;
			}
			n$1(za, "InitializeTransformStream");
			function go(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_transformStreamController") ? !1 : e instanceof Mt;
			}
			n$1(go, "IsTransformStream");
			function _o(e, t$1) {
				J(e._readable._readableStreamController, t$1), xr(e, t$1);
			}
			n$1(_o, "TransformStreamError");
			function xr(e, t$1) {
				Nt(e._transformStreamController), it(e._writable._writableStreamController, t$1), Nr(e);
			}
			n$1(xr, "TransformStreamErrorWritableAndUnblockWrite");
			function Nr(e) {
				e._backpressure && Ut(e, !1);
			}
			n$1(Nr, "TransformStreamUnblockWrite");
			function Ut(e, t$1) {
				e._backpressureChangePromise !== void 0 && e._backpressureChangePromise_resolve(), e._backpressureChangePromise = A((r) => {
					e._backpressureChangePromise_resolve = r;
				}), e._backpressure = t$1;
			}
			n$1(Ut, "TransformStreamSetBackpressure");
			class Pe {
				static {
					n$1(this, "TransformStreamDefaultController");
				}
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get desiredSize() {
					if (!xt(this)) throw Ht("desiredSize");
					const t$1 = this._controlledTransformStream._readable._readableStreamController;
					return Mr(t$1);
				}
				enqueue(t$1 = void 0) {
					if (!xt(this)) throw Ht("enqueue");
					So(this, t$1);
				}
				error(t$1 = void 0) {
					if (!xt(this)) throw Ht("error");
					Da(this, t$1);
				}
				terminate() {
					if (!xt(this)) throw Ht("terminate");
					$a(this);
				}
			}
			Object.defineProperties(Pe.prototype, {
				enqueue: { enumerable: !0 },
				error: { enumerable: !0 },
				terminate: { enumerable: !0 },
				desiredSize: { enumerable: !0 }
			}), h(Pe.prototype.enqueue, "enqueue"), h(Pe.prototype.error, "error"), h(Pe.prototype.terminate, "terminate"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Pe.prototype, Symbol.toStringTag, {
				value: "TransformStreamDefaultController",
				configurable: !0
			});
			function xt(e) {
				return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledTransformStream") ? !1 : e instanceof Pe;
			}
			n$1(xt, "IsTransformStreamDefaultController");
			function ja(e, t$1, r, s, f$1) {
				t$1._controlledTransformStream = e, e._transformStreamController = t$1, t$1._transformAlgorithm = r, t$1._flushAlgorithm = s, t$1._cancelAlgorithm = f$1, t$1._finishPromise = void 0, t$1._finishPromise_resolve = void 0, t$1._finishPromise_reject = void 0;
			}
			n$1(ja, "SetUpTransformStreamDefaultController");
			function La(e, t$1) {
				const r = Object.create(Pe.prototype);
				let s, f$1, c;
				t$1.transform !== void 0 ? s = n$1((d) => t$1.transform(d, r), "transformAlgorithm") : s = n$1((d) => {
					try {
						return So(r, d), T(void 0);
					} catch (p) {
						return b(p);
					}
				}, "transformAlgorithm"), t$1.flush !== void 0 ? f$1 = n$1(() => t$1.flush(r), "flushAlgorithm") : f$1 = n$1(() => T(void 0), "flushAlgorithm"), t$1.cancel !== void 0 ? c = n$1((d) => t$1.cancel(d), "cancelAlgorithm") : c = n$1(() => T(void 0), "cancelAlgorithm"), ja(e, r, s, f$1, c);
			}
			n$1(La, "SetUpTransformStreamDefaultControllerFromTransformer");
			function Nt(e) {
				e._transformAlgorithm = void 0, e._flushAlgorithm = void 0, e._cancelAlgorithm = void 0;
			}
			n$1(Nt, "TransformStreamDefaultControllerClearAlgorithms");
			function So(e, t$1) {
				const r = e._controlledTransformStream, s = r._readable._readableStreamController;
				if (!Ue(s)) throw new TypeError("Readable side is not in a state that permits enqueue");
				try {
					Me(s, t$1);
				} catch (c) {
					throw xr(r, c), r._readable._storedError;
				}
				ma(s) !== r._backpressure && Ut(r, !0);
			}
			n$1(So, "TransformStreamDefaultControllerEnqueue");
			function Da(e, t$1) {
				_o(e._controlledTransformStream, t$1);
			}
			n$1(Da, "TransformStreamDefaultControllerError");
			function wo(e, t$1) {
				const r = e._transformAlgorithm(t$1);
				return F(r, void 0, (s) => {
					throw _o(e._controlledTransformStream, s), s;
				});
			}
			n$1(wo, "TransformStreamDefaultControllerPerformTransform");
			function $a(e) {
				const t$1 = e._controlledTransformStream, r = t$1._readable._readableStreamController;
				Oe(r);
				const s = new TypeError("TransformStream terminated");
				xr(t$1, s);
			}
			n$1($a, "TransformStreamDefaultControllerTerminate");
			function Ma(e, t$1) {
				const r = e._transformStreamController;
				if (e._backpressure) {
					const s = e._backpressureChangePromise;
					return F(s, () => {
						const f$1 = e._writable;
						if (f$1._state === "erroring") throw f$1._storedError;
						return wo(r, t$1);
					});
				}
				return wo(r, t$1);
			}
			n$1(Ma, "TransformStreamDefaultSinkWriteAlgorithm");
			function Ua(e, t$1) {
				const r = e._transformStreamController;
				if (r._finishPromise !== void 0) return r._finishPromise;
				const s = e._readable;
				r._finishPromise = A((c, d) => {
					r._finishPromise_resolve = c, r._finishPromise_reject = d;
				});
				const f$1 = r._cancelAlgorithm(t$1);
				return Nt(r), g(f$1, () => (s._state === "errored" ? xe(r, s._storedError) : (J(s._readableStreamController, t$1), Hr(r)), null), (c) => (J(s._readableStreamController, c), xe(r, c), null)), r._finishPromise;
			}
			n$1(Ua, "TransformStreamDefaultSinkAbortAlgorithm");
			function xa(e) {
				const t$1 = e._transformStreamController;
				if (t$1._finishPromise !== void 0) return t$1._finishPromise;
				const r = e._readable;
				t$1._finishPromise = A((f$1, c) => {
					t$1._finishPromise_resolve = f$1, t$1._finishPromise_reject = c;
				});
				const s = t$1._flushAlgorithm();
				return Nt(t$1), g(s, () => (r._state === "errored" ? xe(t$1, r._storedError) : (Oe(r._readableStreamController), Hr(t$1)), null), (f$1) => (J(r._readableStreamController, f$1), xe(t$1, f$1), null)), t$1._finishPromise;
			}
			n$1(xa, "TransformStreamDefaultSinkCloseAlgorithm");
			function Na(e) {
				return Ut(e, !1), e._backpressureChangePromise;
			}
			n$1(Na, "TransformStreamDefaultSourcePullAlgorithm");
			function Ha(e, t$1) {
				const r = e._transformStreamController;
				if (r._finishPromise !== void 0) return r._finishPromise;
				const s = e._writable;
				r._finishPromise = A((c, d) => {
					r._finishPromise_resolve = c, r._finishPromise_reject = d;
				});
				const f$1 = r._cancelAlgorithm(t$1);
				return Nt(r), g(f$1, () => (s._state === "errored" ? xe(r, s._storedError) : (it(s._writableStreamController, t$1), Nr(e), Hr(r)), null), (c) => (it(s._writableStreamController, c), Nr(e), xe(r, c), null)), r._finishPromise;
			}
			n$1(Ha, "TransformStreamDefaultSourceCancelAlgorithm");
			function Ht(e) {
				return new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`);
			}
			n$1(Ht, "defaultControllerBrandCheckException");
			function Hr(e) {
				e._finishPromise_resolve !== void 0 && (e._finishPromise_resolve(), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
			}
			n$1(Hr, "defaultControllerFinishPromiseResolve");
			function xe(e, t$1) {
				e._finishPromise_reject !== void 0 && (Q(e._finishPromise), e._finishPromise_reject(t$1), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
			}
			n$1(xe, "defaultControllerFinishPromiseReject");
			function Ro(e) {
				return new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`);
			}
			n$1(Ro, "streamBrandCheckException"), a.ByteLengthQueuingStrategy = Dt, a.CountQueuingStrategy = $t, a.ReadableByteStreamController = ce, a.ReadableStream = L, a.ReadableStreamBYOBReader = we, a.ReadableStreamBYOBRequest = ve, a.ReadableStreamDefaultController = he, a.ReadableStreamDefaultReader = ye, a.TransformStream = Mt, a.TransformStreamDefaultController = Pe, a.WritableStream = Re, a.WritableStreamDefaultController = $e, a.WritableStreamDefaultWriter = de;
		});
	}(ct, ct.exports)), ct.exports;
}
n$1(ns, "requirePonyfill_es2018");
var Ao;
function os() {
	if (Ao) return Eo;
	Ao = 1;
	const i = 65536;
	if (!globalThis.ReadableStream) try {
		const o$1 = __require("node:process"), { emitWarning: a } = o$1;
		try {
			o$1.emitWarning = () => {}, Object.assign(globalThis, __require("node:stream/web")), o$1.emitWarning = a;
		} catch (l) {
			throw o$1.emitWarning = a, l;
		}
	} catch {
		Object.assign(globalThis, ns());
	}
	try {
		const { Blob: o$1 } = __require("buffer");
		o$1 && !o$1.prototype.stream && (o$1.prototype.stream = n$1(function(l) {
			let u = 0;
			const m = this;
			return new ReadableStream({
				type: "bytes",
				async pull(h) {
					const E = await m.slice(u, Math.min(m.size, u + i)).arrayBuffer();
					u += E.byteLength, h.enqueue(new Uint8Array(E)), u === m.size && h.close();
				}
			});
		}, "name"));
	} catch {}
	return Eo;
}
n$1(os, "requireStreams"), os();
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ const Bo = 65536;
async function* Qr(i, o$1 = !0) {
	for (const a of i) if ("stream" in a) yield* a.stream();
	else if (ArrayBuffer.isView(a)) if (o$1) {
		let l = a.byteOffset;
		const u = a.byteOffset + a.byteLength;
		for (; l !== u;) {
			const m = Math.min(u - l, Bo), h = a.buffer.slice(l, l + m);
			l += h.byteLength, yield new Uint8Array(h);
		}
	} else yield a;
	else {
		let l = 0, u = a;
		for (; l !== u.size;) {
			const h = await u.slice(l, Math.min(u.size, l + Bo)).arrayBuffer();
			l += h.byteLength, yield new Uint8Array(h);
		}
	}
}
n$1(Qr, "toIterator");
const Wo = class on {
	static {
		n$1(this, "Blob");
	}
	#e = [];
	#t = "";
	#r = 0;
	#n = "transparent";
	constructor(o$1 = [], a = {}) {
		if (typeof o$1 != "object" || o$1 === null) throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
		if (typeof o$1[Symbol.iterator] != "function") throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
		if (typeof a != "object" && typeof a != "function") throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
		a === null && (a = {});
		const l = new TextEncoder();
		for (const m of o$1) {
			let h;
			ArrayBuffer.isView(m) ? h = new Uint8Array(m.buffer.slice(m.byteOffset, m.byteOffset + m.byteLength)) : m instanceof ArrayBuffer ? h = new Uint8Array(m.slice(0)) : m instanceof on ? h = m : h = l.encode(`${m}`), this.#r += ArrayBuffer.isView(h) ? h.byteLength : h.size, this.#e.push(h);
		}
		this.#n = `${a.endings === void 0 ? "transparent" : a.endings}`;
		const u = a.type === void 0 ? "" : String(a.type);
		this.#t = /^[\x20-\x7E]*$/.test(u) ? u : "";
	}
	get size() {
		return this.#r;
	}
	get type() {
		return this.#t;
	}
	async text() {
		const o$1 = new TextDecoder();
		let a = "";
		for await (const l of Qr(this.#e, !1)) a += o$1.decode(l, { stream: !0 });
		return a += o$1.decode(), a;
	}
	async arrayBuffer() {
		const o$1 = new Uint8Array(this.size);
		let a = 0;
		for await (const l of Qr(this.#e, !1)) o$1.set(l, a), a += l.length;
		return o$1.buffer;
	}
	stream() {
		const o$1 = Qr(this.#e, !0);
		return new globalThis.ReadableStream({
			type: "bytes",
			async pull(a) {
				const l = await o$1.next();
				l.done ? a.close() : a.enqueue(l.value);
			},
			async cancel() {
				await o$1.return();
			}
		});
	}
	slice(o$1 = 0, a = this.size, l = "") {
		const { size: u } = this;
		let m = o$1 < 0 ? Math.max(u + o$1, 0) : Math.min(o$1, u), h = a < 0 ? Math.max(u + a, 0) : Math.min(a, u);
		const S = Math.max(h - m, 0), E = this.#e, w = [];
		let A = 0;
		for (const b of E) {
			if (A >= S) break;
			const q = ArrayBuffer.isView(b) ? b.byteLength : b.size;
			if (m && q <= m) m -= q, h -= q;
			else {
				let g;
				ArrayBuffer.isView(b) ? (g = b.subarray(m, Math.min(q, h)), A += g.byteLength) : (g = b.slice(m, Math.min(q, h)), A += g.size), h -= q, w.push(g), m = 0;
			}
		}
		const T = new on([], { type: String(l).toLowerCase() });
		return T.#r = S, T.#e = w, T;
	}
	get [Symbol.toStringTag]() {
		return "Blob";
	}
	static [Symbol.hasInstance](o$1) {
		return o$1 && typeof o$1 == "object" && typeof o$1.constructor == "function" && (typeof o$1.stream == "function" || typeof o$1.arrayBuffer == "function") && /^(Blob|File)$/.test(o$1[Symbol.toStringTag]);
	}
};
Object.defineProperties(Wo.prototype, {
	size: { enumerable: !0 },
	type: { enumerable: !0 },
	slice: { enumerable: !0 }
});
const Ze = Wo, is = class extends Ze {
	static {
		n$1(this, "File");
	}
	#e = 0;
	#t = "";
	constructor(o$1, a, l = {}) {
		if (arguments.length < 2) throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
		super(o$1, l), l === null && (l = {});
		const u = l.lastModified === void 0 ? Date.now() : Number(l.lastModified);
		Number.isNaN(u) || (this.#e = u), this.#t = String(a);
	}
	get name() {
		return this.#t;
	}
	get lastModified() {
		return this.#e;
	}
	get [Symbol.toStringTag]() {
		return "File";
	}
	static [Symbol.hasInstance](o$1) {
		return !!o$1 && o$1 instanceof Ze && /^(File)$/.test(o$1[Symbol.toStringTag]);
	}
}, Yr = is;
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ var { toStringTag: dt, iterator: as, hasInstance: ss } = Symbol, ko = Math.random, us = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","), qo = n$1((i, o$1, a) => (i += "", /^(Blob|File)$/.test(o$1 && o$1[dt]) ? [(a = a !== void 0 ? a + "" : o$1[dt] == "File" ? o$1.name : "blob", i), o$1.name !== a || o$1[dt] == "blob" ? new Yr([o$1], a, o$1) : o$1] : [i, o$1 + ""]), "f"), Gr = n$1((i, o$1) => (o$1 ? i : i.replace(/\r?\n|\r/g, `\r
`)).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), "e$1"), Fe = n$1((i, o$1, a) => {
	if (o$1.length < a) throw new TypeError(`Failed to execute '${i}' on 'FormData': ${a} arguments required, but only ${o$1.length} present.`);
}, "x");
const Zt = class {
	static {
		n$1(this, "FormData");
	}
	#e = [];
	constructor(...o$1) {
		if (o$1.length) throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.");
	}
	get [dt]() {
		return "FormData";
	}
	[as]() {
		return this.entries();
	}
	static [ss](o$1) {
		return o$1 && typeof o$1 == "object" && o$1[dt] === "FormData" && !us.some((a) => typeof o$1[a] != "function");
	}
	append(...o$1) {
		Fe("append", arguments, 2), this.#e.push(qo(...o$1));
	}
	delete(o$1) {
		Fe("delete", arguments, 1), o$1 += "", this.#e = this.#e.filter(([a]) => a !== o$1);
	}
	get(o$1) {
		Fe("get", arguments, 1), o$1 += "";
		for (var a = this.#e, l = a.length, u = 0; u < l; u++) if (a[u][0] === o$1) return a[u][1];
		return null;
	}
	getAll(o$1, a) {
		return Fe("getAll", arguments, 1), a = [], o$1 += "", this.#e.forEach((l) => l[0] === o$1 && a.push(l[1])), a;
	}
	has(o$1) {
		return Fe("has", arguments, 1), o$1 += "", this.#e.some((a) => a[0] === o$1);
	}
	forEach(o$1, a) {
		Fe("forEach", arguments, 1);
		for (var [l, u] of this) o$1.call(a, u, l, this);
	}
	set(...o$1) {
		Fe("set", arguments, 2);
		var a = [], l = !0;
		o$1 = qo(...o$1), this.#e.forEach((u) => {
			u[0] === o$1[0] ? l && (l = !a.push(o$1)) : a.push(u);
		}), l && a.push(o$1), this.#e = a;
	}
	*entries() {
		yield* this.#e;
	}
	*keys() {
		for (var [o$1] of this) yield o$1;
	}
	*values() {
		for (var [, o$1] of this) yield o$1;
	}
};
function ls(i, o$1 = Ze) {
	var a = `${ko()}${ko()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), l = [], u = `--${a}\r
Content-Disposition: form-data; name="`;
	return i.forEach((m, h) => typeof m == "string" ? l.push(u + Gr(h) + `"\r
\r
${m.replace(/\r(?!\n)|(?<!\r)\n/g, `\r
`)}\r
`) : l.push(u + Gr(h) + `"; filename="${Gr(m.name, 1)}"\r
Content-Type: ${m.type || "application/octet-stream"}\r
\r
`, m, `\r
`)), l.push(`--${a}--`), new o$1(l, { type: "multipart/form-data; boundary=" + a });
}
n$1(ls, "formDataToBlob");
var Kt = class extends Error {
	static {
		n$1(this, "FetchBaseError");
	}
	constructor(o$1, a) {
		super(o$1), Error.captureStackTrace(this, this.constructor), this.type = a;
	}
	get name() {
		return this.constructor.name;
	}
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
};
var te = class extends Kt {
	static {
		n$1(this, "FetchError");
	}
	constructor(o$1, a, l) {
		super(o$1, a), l && (this.code = this.errno = l.code, this.erroredSysCall = l.syscall);
	}
};
const Jt = Symbol.toStringTag, Oo = n$1((i) => typeof i == "object" && typeof i.append == "function" && typeof i.delete == "function" && typeof i.get == "function" && typeof i.getAll == "function" && typeof i.has == "function" && typeof i.set == "function" && typeof i.sort == "function" && i[Jt] === "URLSearchParams", "isURLSearchParameters"), Xt = n$1((i) => i && typeof i == "object" && typeof i.arrayBuffer == "function" && typeof i.type == "string" && typeof i.stream == "function" && typeof i.constructor == "function" && /^(Blob|File)$/.test(i[Jt]), "isBlob"), fs = n$1((i) => typeof i == "object" && (i[Jt] === "AbortSignal" || i[Jt] === "EventTarget"), "isAbortSignal"), cs = n$1((i, o$1) => {
	const a = new URL(o$1).hostname, l = new URL(i).hostname;
	return a === l || a.endsWith(`.${l}`);
}, "isDomainOrSubdomain"), ds = n$1((i, o$1) => {
	const a = new URL(o$1).protocol, l = new URL(i).protocol;
	return a === l;
}, "isSameProtocol"), hs = promisify(ie.pipeline), N = Symbol("Body internals");
var ht = class {
	static {
		n$1(this, "Body");
	}
	constructor(o$1, { size: a = 0 } = {}) {
		let l = null;
		o$1 === null ? o$1 = null : Oo(o$1) ? o$1 = Buffer$1.from(o$1.toString()) : Xt(o$1) || Buffer$1.isBuffer(o$1) || (types.isAnyArrayBuffer(o$1) ? o$1 = Buffer$1.from(o$1) : ArrayBuffer.isView(o$1) ? o$1 = Buffer$1.from(o$1.buffer, o$1.byteOffset, o$1.byteLength) : o$1 instanceof ie || (o$1 instanceof Zt ? (o$1 = ls(o$1), l = o$1.type.split("=")[1]) : o$1 = Buffer$1.from(String(o$1))));
		let u = o$1;
		Buffer$1.isBuffer(o$1) ? u = ie.Readable.from(o$1) : Xt(o$1) && (u = ie.Readable.from(o$1.stream())), this[N] = {
			body: o$1,
			stream: u,
			boundary: l,
			disturbed: !1,
			error: null
		}, this.size = a, o$1 instanceof ie && o$1.on("error", (m) => {
			const h = m instanceof Kt ? m : new te(`Invalid response body while trying to fetch ${this.url}: ${m.message}`, "system", m);
			this[N].error = h;
		});
	}
	get body() {
		return this[N].stream;
	}
	get bodyUsed() {
		return this[N].disturbed;
	}
	async arrayBuffer() {
		const { buffer: o$1, byteOffset: a, byteLength: l } = await Zr(this);
		return o$1.slice(a, a + l);
	}
	async formData() {
		const o$1 = this.headers.get("content-type");
		if (o$1.startsWith("application/x-www-form-urlencoded")) {
			const l = new Zt(), u = new URLSearchParams(await this.text());
			for (const [m, h] of u) l.append(m, h);
			return l;
		}
		const { toFormData: a } = await import("./multipart-parser-CqHLpbgP.js");
		return a(this.body, o$1);
	}
	async blob() {
		const o$1 = this.headers && this.headers.get("content-type") || this[N].body && this[N].body.type || "", a = await this.arrayBuffer();
		return new Ze([a], { type: o$1 });
	}
	async json() {
		const o$1 = await this.text();
		return JSON.parse(o$1);
	}
	async text() {
		const o$1 = await Zr(this);
		return new TextDecoder().decode(o$1);
	}
	buffer() {
		return Zr(this);
	}
};
ht.prototype.buffer = deprecate(ht.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer"), Object.defineProperties(ht.prototype, {
	body: { enumerable: !0 },
	bodyUsed: { enumerable: !0 },
	arrayBuffer: { enumerable: !0 },
	blob: { enumerable: !0 },
	json: { enumerable: !0 },
	text: { enumerable: !0 },
	data: { get: deprecate(() => {}, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
});
async function Zr(i) {
	if (i[N].disturbed) throw new TypeError(`body used already for: ${i.url}`);
	if (i[N].disturbed = !0, i[N].error) throw i[N].error;
	const { body: o$1 } = i;
	if (o$1 === null) return Buffer$1.alloc(0);
	if (!(o$1 instanceof ie)) return Buffer$1.alloc(0);
	const a = [];
	let l = 0;
	try {
		for await (const u of o$1) {
			if (i.size > 0 && l + u.length > i.size) {
				const m = new te(`content size at ${i.url} over limit: ${i.size}`, "max-size");
				throw o$1.destroy(m), m;
			}
			l += u.length, a.push(u);
		}
	} catch (u) {
		throw u instanceof Kt ? u : new te(`Invalid response body while trying to fetch ${i.url}: ${u.message}`, "system", u);
	}
	if (o$1.readableEnded === !0 || o$1._readableState.ended === !0) try {
		return a.every((u) => typeof u == "string") ? Buffer$1.from(a.join("")) : Buffer$1.concat(a, l);
	} catch (u) {
		throw new te(`Could not create Buffer from response body for ${i.url}: ${u.message}`, "system", u);
	}
	else throw new te(`Premature close of server response while trying to fetch ${i.url}`);
}
n$1(Zr, "consumeBody");
const Kr = n$1((i, o$1) => {
	let a, l, { body: u } = i[N];
	if (i.bodyUsed) throw new Error("cannot clone body after it is used");
	return u instanceof ie && typeof u.getBoundary != "function" && (a = new PassThrough({ highWaterMark: o$1 }), l = new PassThrough({ highWaterMark: o$1 }), u.pipe(a), u.pipe(l), i[N].stream = a, u = l), u;
}, "clone"), ms = deprecate((i) => i.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167"), Io = n$1((i, o$1) => i === null ? null : typeof i == "string" ? "text/plain;charset=UTF-8" : Oo(i) ? "application/x-www-form-urlencoded;charset=UTF-8" : Xt(i) ? i.type || null : Buffer$1.isBuffer(i) || types.isAnyArrayBuffer(i) || ArrayBuffer.isView(i) ? null : i instanceof Zt ? `multipart/form-data; boundary=${o$1[N].boundary}` : i && typeof i.getBoundary == "function" ? `multipart/form-data;boundary=${ms(i)}` : i instanceof ie ? null : "text/plain;charset=UTF-8", "extractContentType"), bs = n$1((i) => {
	const { body: o$1 } = i[N];
	return o$1 === null ? 0 : Xt(o$1) ? o$1.size : Buffer$1.isBuffer(o$1) ? o$1.length : o$1 && typeof o$1.getLengthSync == "function" && o$1.hasKnownLength && o$1.hasKnownLength() ? o$1.getLengthSync() : null;
}, "getTotalBytes"), ps = n$1(async (i, { body: o$1 }) => {
	o$1 === null ? i.end() : await hs(o$1, i);
}, "writeToStream"), er = typeof http.validateHeaderName == "function" ? http.validateHeaderName : (i) => {
	if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(i)) {
		const o$1 = new TypeError(`Header name must be a valid HTTP token [${i}]`);
		throw Object.defineProperty(o$1, "code", { value: "ERR_INVALID_HTTP_TOKEN" }), o$1;
	}
}, Jr = typeof http.validateHeaderValue == "function" ? http.validateHeaderValue : (i, o$1) => {
	if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(o$1)) {
		const a = new TypeError(`Invalid character in header content ["${i}"]`);
		throw Object.defineProperty(a, "code", { value: "ERR_INVALID_CHAR" }), a;
	}
};
var ae = class ae extends URLSearchParams {
	static {
		n$1(this, "Headers");
	}
	constructor(o$1) {
		let a = [];
		if (o$1 instanceof ae) {
			const l = o$1.raw();
			for (const [u, m] of Object.entries(l)) a.push(...m.map((h) => [u, h]));
		} else if (o$1 != null) if (typeof o$1 == "object" && !types.isBoxedPrimitive(o$1)) {
			const l = o$1[Symbol.iterator];
			if (l == null) a.push(...Object.entries(o$1));
			else {
				if (typeof l != "function") throw new TypeError("Header pairs must be iterable");
				a = [...o$1].map((u) => {
					if (typeof u != "object" || types.isBoxedPrimitive(u)) throw new TypeError("Each header pair must be an iterable object");
					return [...u];
				}).map((u) => {
					if (u.length !== 2) throw new TypeError("Each header pair must be a name/value tuple");
					return [...u];
				});
			}
		} else throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
		return a = a.length > 0 ? a.map(([l, u]) => (er(l), Jr(l, String(u)), [String(l).toLowerCase(), String(u)])) : void 0, super(a), new Proxy(this, { get(l, u, m) {
			switch (u) {
				case "append":
				case "set": return (h, S) => (er(h), Jr(h, String(S)), URLSearchParams.prototype[u].call(l, String(h).toLowerCase(), String(S)));
				case "delete":
				case "has":
				case "getAll": return (h) => (er(h), URLSearchParams.prototype[u].call(l, String(h).toLowerCase()));
				case "keys": return () => (l.sort(), new Set(URLSearchParams.prototype.keys.call(l)).keys());
				default: return Reflect.get(l, u, m);
			}
		} });
	}
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
	toString() {
		return Object.prototype.toString.call(this);
	}
	get(o$1) {
		const a = this.getAll(o$1);
		if (a.length === 0) return null;
		let l = a.join(", ");
		return /^content-encoding$/i.test(o$1) && (l = l.toLowerCase()), l;
	}
	forEach(o$1, a = void 0) {
		for (const l of this.keys()) Reflect.apply(o$1, a, [
			this.get(l),
			l,
			this
		]);
	}
	*values() {
		for (const o$1 of this.keys()) yield this.get(o$1);
	}
	*entries() {
		for (const o$1 of this.keys()) yield [o$1, this.get(o$1)];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	raw() {
		return [...this.keys()].reduce((o$1, a) => (o$1[a] = this.getAll(a), o$1), {});
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return [...this.keys()].reduce((o$1, a) => {
			const l = this.getAll(a);
			return a === "host" ? o$1[a] = l[0] : o$1[a] = l.length > 1 ? l : l[0], o$1;
		}, {});
	}
};
Object.defineProperties(ae.prototype, [
	"get",
	"entries",
	"forEach",
	"values"
].reduce((i, o$1) => (i[o$1] = { enumerable: !0 }, i), {}));
function ys(i = []) {
	return new ae(i.reduce((o$1, a, l, u) => (l % 2 === 0 && o$1.push(u.slice(l, l + 2)), o$1), []).filter(([o$1, a]) => {
		try {
			return er(o$1), Jr(o$1, String(a)), !0;
		} catch {
			return !1;
		}
	}));
}
n$1(ys, "fromRawHeaders");
const gs = new Set([
	301,
	302,
	303,
	307,
	308
]), Xr = n$1((i) => gs.has(i), "isRedirect"), re = Symbol("Response internals");
var H = class H extends ht {
	static {
		n$1(this, "Response");
	}
	constructor(o$1 = null, a = {}) {
		super(o$1, a);
		const l = a.status != null ? a.status : 200, u = new ae(a.headers);
		if (o$1 !== null && !u.has("Content-Type")) {
			const m = Io(o$1, this);
			m && u.append("Content-Type", m);
		}
		this[re] = {
			type: "default",
			url: a.url,
			status: l,
			statusText: a.statusText || "",
			headers: u,
			counter: a.counter,
			highWaterMark: a.highWaterMark
		};
	}
	get type() {
		return this[re].type;
	}
	get url() {
		return this[re].url || "";
	}
	get status() {
		return this[re].status;
	}
	get ok() {
		return this[re].status >= 200 && this[re].status < 300;
	}
	get redirected() {
		return this[re].counter > 0;
	}
	get statusText() {
		return this[re].statusText;
	}
	get headers() {
		return this[re].headers;
	}
	get highWaterMark() {
		return this[re].highWaterMark;
	}
	clone() {
		return new H(Kr(this, this.highWaterMark), {
			type: this.type,
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected,
			size: this.size,
			highWaterMark: this.highWaterMark
		});
	}
	static redirect(o$1, a = 302) {
		if (!Xr(a)) throw new RangeError("Failed to execute \"redirect\" on \"response\": Invalid status code");
		return new H(null, {
			headers: { location: new URL(o$1).toString() },
			status: a
		});
	}
	static error() {
		const o$1 = new H(null, {
			status: 0,
			statusText: ""
		});
		return o$1[re].type = "error", o$1;
	}
	static json(o$1 = void 0, a = {}) {
		const l = JSON.stringify(o$1);
		if (l === void 0) throw new TypeError("data is not JSON serializable");
		const u = new ae(a && a.headers);
		return u.has("content-type") || u.set("content-type", "application/json"), new H(l, {
			...a,
			headers: u
		});
	}
	get [Symbol.toStringTag]() {
		return "Response";
	}
};
Object.defineProperties(H.prototype, {
	type: { enumerable: !0 },
	url: { enumerable: !0 },
	status: { enumerable: !0 },
	ok: { enumerable: !0 },
	redirected: { enumerable: !0 },
	statusText: { enumerable: !0 },
	headers: { enumerable: !0 },
	clone: { enumerable: !0 }
});
const _s = n$1((i) => {
	if (i.search) return i.search;
	const o$1 = i.href.length - 1, a = i.hash || (i.href[o$1] === "#" ? "#" : "");
	return i.href[o$1 - a.length] === "?" ? "?" : "";
}, "getSearch");
function Fo(i, o$1 = !1) {
	return i == null || (i = new URL(i), /^(about|blob|data):$/.test(i.protocol)) ? "no-referrer" : (i.username = "", i.password = "", i.hash = "", o$1 && (i.pathname = "", i.search = ""), i);
}
n$1(Fo, "stripURLForUseAsAReferrer");
const zo = new Set([
	"",
	"no-referrer",
	"no-referrer-when-downgrade",
	"same-origin",
	"origin",
	"strict-origin",
	"origin-when-cross-origin",
	"strict-origin-when-cross-origin",
	"unsafe-url"
]), Ss = "strict-origin-when-cross-origin";
function ws(i) {
	if (!zo.has(i)) throw new TypeError(`Invalid referrerPolicy: ${i}`);
	return i;
}
n$1(ws, "validateReferrerPolicy");
function Rs(i) {
	if (/^(http|ws)s:$/.test(i.protocol)) return !0;
	const o$1 = i.host.replace(/(^\[)|(]$)/g, ""), a = isIP(o$1);
	return a === 4 && /^127\./.test(o$1) || a === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(o$1) ? !0 : i.host === "localhost" || i.host.endsWith(".localhost") ? !1 : i.protocol === "file:";
}
n$1(Rs, "isOriginPotentiallyTrustworthy");
function Ke(i) {
	return /^about:(blank|srcdoc)$/.test(i) || i.protocol === "data:" || /^(blob|filesystem):$/.test(i.protocol) ? !0 : Rs(i);
}
n$1(Ke, "isUrlPotentiallyTrustworthy");
function Ts(i, { referrerURLCallback: o$1, referrerOriginCallback: a } = {}) {
	if (i.referrer === "no-referrer" || i.referrerPolicy === "") return null;
	const l = i.referrerPolicy;
	if (i.referrer === "about:client") return "no-referrer";
	const u = i.referrer;
	let m = Fo(u), h = Fo(u, !0);
	m.toString().length > 4096 && (m = h), o$1 && (m = o$1(m)), a && (h = a(h));
	const S = new URL(i.url);
	switch (l) {
		case "no-referrer": return "no-referrer";
		case "origin": return h;
		case "unsafe-url": return m;
		case "strict-origin": return Ke(m) && !Ke(S) ? "no-referrer" : h.toString();
		case "strict-origin-when-cross-origin": return m.origin === S.origin ? m : Ke(m) && !Ke(S) ? "no-referrer" : h;
		case "same-origin": return m.origin === S.origin ? m : "no-referrer";
		case "origin-when-cross-origin": return m.origin === S.origin ? m : h;
		case "no-referrer-when-downgrade": return Ke(m) && !Ke(S) ? "no-referrer" : m;
		default: throw new TypeError(`Invalid referrerPolicy: ${l}`);
	}
}
n$1(Ts, "determineRequestsReferrer");
function Cs(i) {
	const o$1 = (i.get("referrer-policy") || "").split(/[,\s]+/);
	let a = "";
	for (const l of o$1) l && zo.has(l) && (a = l);
	return a;
}
n$1(Cs, "parseReferrerPolicyFromHeader");
const j = Symbol("Request internals"), mt = n$1((i) => typeof i == "object" && typeof i[j] == "object", "isRequest"), Ps = deprecate(() => {}, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
var Xe = class Xe extends ht {
	static {
		n$1(this, "Request");
	}
	constructor(o$1, a = {}) {
		let l;
		if (mt(o$1) ? l = new URL(o$1.url) : (l = new URL(o$1), o$1 = {}), l.username !== "" || l.password !== "") throw new TypeError(`${l} is an url with embedded credentials.`);
		let u = a.method || o$1.method || "GET";
		if (/^(delete|get|head|options|post|put)$/i.test(u) && (u = u.toUpperCase()), !mt(a) && "data" in a && Ps(), (a.body != null || mt(o$1) && o$1.body !== null) && (u === "GET" || u === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body");
		const m = a.body ? a.body : mt(o$1) && o$1.body !== null ? Kr(o$1) : null;
		super(m, { size: a.size || o$1.size || 0 });
		const h = new ae(a.headers || o$1.headers || {});
		if (m !== null && !h.has("Content-Type")) {
			const w = Io(m, this);
			w && h.set("Content-Type", w);
		}
		let S = mt(o$1) ? o$1.signal : null;
		if ("signal" in a && (S = a.signal), S != null && !fs(S)) throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
		let E = a.referrer == null ? o$1.referrer : a.referrer;
		if (E === "") E = "no-referrer";
		else if (E) {
			const w = new URL(E);
			E = /^about:(\/\/)?client$/.test(w) ? "client" : w;
		} else E = void 0;
		this[j] = {
			method: u,
			redirect: a.redirect || o$1.redirect || "follow",
			headers: h,
			parsedURL: l,
			signal: S,
			referrer: E
		}, this.follow = a.follow === void 0 ? o$1.follow === void 0 ? 20 : o$1.follow : a.follow, this.compress = a.compress === void 0 ? o$1.compress === void 0 ? !0 : o$1.compress : a.compress, this.counter = a.counter || o$1.counter || 0, this.agent = a.agent || o$1.agent, this.highWaterMark = a.highWaterMark || o$1.highWaterMark || 16384, this.insecureHTTPParser = a.insecureHTTPParser || o$1.insecureHTTPParser || !1, this.referrerPolicy = a.referrerPolicy || o$1.referrerPolicy || "";
	}
	get method() {
		return this[j].method;
	}
	get url() {
		return format(this[j].parsedURL);
	}
	get headers() {
		return this[j].headers;
	}
	get redirect() {
		return this[j].redirect;
	}
	get signal() {
		return this[j].signal;
	}
	get referrer() {
		if (this[j].referrer === "no-referrer") return "";
		if (this[j].referrer === "client") return "about:client";
		if (this[j].referrer) return this[j].referrer.toString();
	}
	get referrerPolicy() {
		return this[j].referrerPolicy;
	}
	set referrerPolicy(o$1) {
		this[j].referrerPolicy = ws(o$1);
	}
	clone() {
		return new Xe(this);
	}
	get [Symbol.toStringTag]() {
		return "Request";
	}
};
Object.defineProperties(Xe.prototype, {
	method: { enumerable: !0 },
	url: { enumerable: !0 },
	headers: { enumerable: !0 },
	redirect: { enumerable: !0 },
	clone: { enumerable: !0 },
	signal: { enumerable: !0 },
	referrer: { enumerable: !0 },
	referrerPolicy: { enumerable: !0 }
});
const Es = n$1((i) => {
	const { parsedURL: o$1 } = i[j], a = new ae(i[j].headers);
	a.has("Accept") || a.set("Accept", "*/*");
	let l = null;
	if (i.body === null && /^(post|put)$/i.test(i.method) && (l = "0"), i.body !== null) {
		const S = bs(i);
		typeof S == "number" && !Number.isNaN(S) && (l = String(S));
	}
	l && a.set("Content-Length", l), i.referrerPolicy === "" && (i.referrerPolicy = Ss), i.referrer && i.referrer !== "no-referrer" ? i[j].referrer = Ts(i) : i[j].referrer = "no-referrer", i[j].referrer instanceof URL && a.set("Referer", i.referrer), a.has("User-Agent") || a.set("User-Agent", "node-fetch"), i.compress && !a.has("Accept-Encoding") && a.set("Accept-Encoding", "gzip, deflate, br");
	let { agent: u } = i;
	typeof u == "function" && (u = u(o$1));
	const m = _s(o$1), h = {
		path: o$1.pathname + m,
		method: i.method,
		headers: a[Symbol.for("nodejs.util.inspect.custom")](),
		insecureHTTPParser: i.insecureHTTPParser,
		agent: u
	};
	return {
		parsedURL: o$1,
		options: h
	};
}, "getNodeRequestOptions");
var jo = class extends Kt {
	static {
		n$1(this, "AbortError");
	}
	constructor(o$1, a = "aborted") {
		super(o$1, a);
	}
};
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ var en, Lo;
function vs() {
	if (Lo) return en;
	if (Lo = 1, !globalThis.DOMException) try {
		const { MessageChannel: i } = __require("worker_threads"), o$1 = new i().port1, a = new ArrayBuffer();
		o$1.postMessage(a, [a, a]);
	} catch (i) {
		i.constructor.name === "DOMException" && (globalThis.DOMException = i.constructor);
	}
	return en = globalThis.DOMException, en;
}
n$1(vs, "requireNodeDomexception");
var As = vs();
const Bs = f(As), { stat: tn } = promises, Ws = n$1((i, o$1) => Do(statSync(i), i, o$1), "blobFromSync"), ks = n$1((i, o$1) => tn(i).then((a) => Do(a, i, o$1)), "blobFrom"), qs = n$1((i, o$1) => tn(i).then((a) => $o(a, i, o$1)), "fileFrom"), Os = n$1((i, o$1) => $o(statSync(i), i, o$1), "fileFromSync"), Do = n$1((i, o$1, a = "") => new Ze([new ir({
	path: o$1,
	size: i.size,
	lastModified: i.mtimeMs,
	start: 0
})], { type: a }), "fromBlob"), $o = n$1((i, o$1, a = "") => new Yr([new ir({
	path: o$1,
	size: i.size,
	lastModified: i.mtimeMs,
	start: 0
})], basename(o$1), {
	type: a,
	lastModified: i.mtimeMs
}), "fromFile");
var ir = class ir {
	static {
		n$1(this, "BlobDataItem");
	}
	#e;
	#t;
	constructor(o$1) {
		this.#e = o$1.path, this.#t = o$1.start, this.size = o$1.size, this.lastModified = o$1.lastModified;
	}
	slice(o$1, a) {
		return new ir({
			path: this.#e,
			lastModified: this.lastModified,
			size: a - o$1,
			start: this.#t + o$1
		});
	}
	async *stream() {
		const { mtimeMs: o$1 } = await tn(this.#e);
		if (o$1 > this.lastModified) throw new Bs("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
		yield* createReadStream(this.#e, {
			start: this.#t,
			end: this.#t + this.size - 1
		});
	}
	get [Symbol.toStringTag]() {
		return "Blob";
	}
};
const Is = new Set([
	"data:",
	"http:",
	"https:"
]);
async function Mo(i, o$1) {
	return new Promise((a, l) => {
		const u = new Xe(i, o$1), { parsedURL: m, options: h } = Es(u);
		if (!Is.has(m.protocol)) throw new TypeError(`node-fetch cannot load ${i}. URL scheme "${m.protocol.replace(/:$/, "")}" is not supported.`);
		if (m.protocol === "data:") {
			const g = ts(u.url), V = new H(g, { headers: { "Content-Type": g.typeFull } });
			a(V);
			return;
		}
		const S = (m.protocol === "https:" ? https : http).request, { signal: E } = u;
		let w = null;
		const A = n$1(() => {
			const g = new jo("The operation was aborted.");
			l(g), u.body && u.body instanceof ie.Readable && u.body.destroy(g), !(!w || !w.body) && w.body.emit("error", g);
		}, "abort");
		if (E && E.aborted) {
			A();
			return;
		}
		const T = n$1(() => {
			A(), q();
		}, "abortAndFinalize"), b = S(m.toString(), h);
		E && E.addEventListener("abort", T);
		const q = n$1(() => {
			b.abort(), E && E.removeEventListener("abort", T);
		}, "finalize");
		b.on("error", (g) => {
			l(new te(`request to ${u.url} failed, reason: ${g.message}`, "system", g)), q();
		}), Fs(b, (g) => {
			w && w.body && w.body.destroy(g);
		}), process.version < "v14" && b.on("socket", (g) => {
			let V;
			g.prependListener("end", () => {
				V = g._eventsCount;
			}), g.prependListener("close", (I) => {
				if (w && V < g._eventsCount && !I) {
					const F = new Error("Premature close");
					F.code = "ERR_STREAM_PREMATURE_CLOSE", w.body.emit("error", F);
				}
			});
		}), b.on("response", (g) => {
			b.setTimeout(0);
			const V = ys(g.rawHeaders);
			if (Xr(g.statusCode)) {
				const O = V.get("Location");
				let z = null;
				try {
					z = O === null ? null : new URL(O, u.url);
				} catch {
					if (u.redirect !== "manual") {
						l(new te(`uri requested responds with an invalid redirect URL: ${O}`, "invalid-redirect")), q();
						return;
					}
				}
				switch (u.redirect) {
					case "error":
						l(new te(`uri requested responds with a redirect, redirect mode is set to error: ${u.url}`, "no-redirect")), q();
						return;
					case "manual": break;
					case "follow": {
						if (z === null) break;
						if (u.counter >= u.follow) {
							l(new te(`maximum redirect reached at: ${u.url}`, "max-redirect")), q();
							return;
						}
						const $ = {
							headers: new ae(u.headers),
							follow: u.follow,
							counter: u.counter + 1,
							agent: u.agent,
							compress: u.compress,
							method: u.method,
							body: Kr(u),
							signal: u.signal,
							size: u.size,
							referrer: u.referrer,
							referrerPolicy: u.referrerPolicy
						};
						if (!cs(u.url, z) || !ds(u.url, z)) for (const pt of [
							"authorization",
							"www-authenticate",
							"cookie",
							"cookie2"
						]) $.headers.delete(pt);
						if (g.statusCode !== 303 && u.body && o$1.body instanceof ie.Readable) {
							l(new te("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), q();
							return;
						}
						(g.statusCode === 303 || (g.statusCode === 301 || g.statusCode === 302) && u.method === "POST") && ($.method = "GET", $.body = void 0, $.headers.delete("content-length"));
						const M = Cs(V);
						M && ($.referrerPolicy = M), a(Mo(new Xe(z, $))), q();
						return;
					}
					default: return l(new TypeError(`Redirect option '${u.redirect}' is not a valid value of RequestRedirect`));
				}
			}
			E && g.once("end", () => {
				E.removeEventListener("abort", T);
			});
			let I = pipeline(g, new PassThrough(), (O) => {
				O && l(O);
			});
			process.version < "v12.10" && g.on("aborted", T);
			const F = {
				url: u.url,
				status: g.statusCode,
				statusText: g.statusMessage,
				headers: V,
				size: u.size,
				counter: u.counter,
				highWaterMark: u.highWaterMark
			}, Q = V.get("Content-Encoding");
			if (!u.compress || u.method === "HEAD" || Q === null || g.statusCode === 204 || g.statusCode === 304) {
				w = new H(I, F), a(w);
				return;
			}
			const se = {
				flush: Ye.Z_SYNC_FLUSH,
				finishFlush: Ye.Z_SYNC_FLUSH
			};
			if (Q === "gzip" || Q === "x-gzip") {
				I = pipeline(I, Ye.createGunzip(se), (O) => {
					O && l(O);
				}), w = new H(I, F), a(w);
				return;
			}
			if (Q === "deflate" || Q === "x-deflate") {
				const O = pipeline(g, new PassThrough(), (z) => {
					z && l(z);
				});
				O.once("data", (z) => {
					(z[0] & 15) === 8 ? I = pipeline(I, Ye.createInflate(), ($) => {
						$ && l($);
					}) : I = pipeline(I, Ye.createInflateRaw(), ($) => {
						$ && l($);
					}), w = new H(I, F), a(w);
				}), O.once("end", () => {
					w || (w = new H(I, F), a(w));
				});
				return;
			}
			if (Q === "br") {
				I = pipeline(I, Ye.createBrotliDecompress(), (O) => {
					O && l(O);
				}), w = new H(I, F), a(w);
				return;
			}
			w = new H(I, F), a(w);
		}), ps(b, u).catch(l);
	});
}
n$1(Mo, "fetch$1");
function Fs(i, o$1) {
	const a = Buffer$1.from(`0\r
\r
`);
	let l = !1, u = !1, m;
	i.on("response", (h) => {
		const { headers: S } = h;
		l = S["transfer-encoding"] === "chunked" && !S["content-length"];
	}), i.on("socket", (h) => {
		const S = n$1(() => {
			if (l && !u) {
				const w = new Error("Premature close");
				w.code = "ERR_STREAM_PREMATURE_CLOSE", o$1(w);
			}
		}, "onSocketClose"), E = n$1((w) => {
			u = Buffer$1.compare(w.slice(-5), a) === 0, !u && m && (u = Buffer$1.compare(m.slice(-3), a.slice(0, 3)) === 0 && Buffer$1.compare(w.slice(-2), a.slice(3)) === 0), m = w;
		}, "onData");
		h.prependListener("close", S), h.on("data", E), i.on("close", () => {
			h.removeListener("close", S), h.removeListener("data", E);
		});
	});
}
n$1(Fs, "fixResponseChunkedTransferBadEnding");
const Uo = /* @__PURE__ */ new WeakMap(), rn = /* @__PURE__ */ new WeakMap();
function k(i) {
	const o$1 = Uo.get(i);
	return console.assert(o$1 != null, "'this' is expected an Event object, but got", i), o$1;
}
n$1(k, "pd");
function xo(i) {
	if (i.passiveListener != null) {
		typeof console < "u" && typeof console.error == "function" && console.error("Unable to preventDefault inside passive event listener invocation.", i.passiveListener);
		return;
	}
	i.event.cancelable && (i.canceled = !0, typeof i.event.preventDefault == "function" && i.event.preventDefault());
}
n$1(xo, "setCancelFlag");
function Je(i, o$1) {
	Uo.set(this, {
		eventTarget: i,
		event: o$1,
		eventPhase: 2,
		currentTarget: i,
		canceled: !1,
		stopped: !1,
		immediateStopped: !1,
		passiveListener: null,
		timeStamp: o$1.timeStamp || Date.now()
	}), Object.defineProperty(this, "isTrusted", {
		value: !1,
		enumerable: !0
	});
	const a = Object.keys(o$1);
	for (let l = 0; l < a.length; ++l) {
		const u = a[l];
		u in this || Object.defineProperty(this, u, No(u));
	}
}
n$1(Je, "Event"), Je.prototype = {
	get type() {
		return k(this).event.type;
	},
	get target() {
		return k(this).eventTarget;
	},
	get currentTarget() {
		return k(this).currentTarget;
	},
	composedPath() {
		const i = k(this).currentTarget;
		return i == null ? [] : [i];
	},
	get NONE() {
		return 0;
	},
	get CAPTURING_PHASE() {
		return 1;
	},
	get AT_TARGET() {
		return 2;
	},
	get BUBBLING_PHASE() {
		return 3;
	},
	get eventPhase() {
		return k(this).eventPhase;
	},
	stopPropagation() {
		const i = k(this);
		i.stopped = !0, typeof i.event.stopPropagation == "function" && i.event.stopPropagation();
	},
	stopImmediatePropagation() {
		const i = k(this);
		i.stopped = !0, i.immediateStopped = !0, typeof i.event.stopImmediatePropagation == "function" && i.event.stopImmediatePropagation();
	},
	get bubbles() {
		return !!k(this).event.bubbles;
	},
	get cancelable() {
		return !!k(this).event.cancelable;
	},
	preventDefault() {
		xo(k(this));
	},
	get defaultPrevented() {
		return k(this).canceled;
	},
	get composed() {
		return !!k(this).event.composed;
	},
	get timeStamp() {
		return k(this).timeStamp;
	},
	get srcElement() {
		return k(this).eventTarget;
	},
	get cancelBubble() {
		return k(this).stopped;
	},
	set cancelBubble(i) {
		if (!i) return;
		const o$1 = k(this);
		o$1.stopped = !0, typeof o$1.event.cancelBubble == "boolean" && (o$1.event.cancelBubble = !0);
	},
	get returnValue() {
		return !k(this).canceled;
	},
	set returnValue(i) {
		i || xo(k(this));
	},
	initEvent() {}
}, Object.defineProperty(Je.prototype, "constructor", {
	value: Je,
	configurable: !0,
	writable: !0
}), typeof window < "u" && typeof window.Event < "u" && (Object.setPrototypeOf(Je.prototype, window.Event.prototype), rn.set(window.Event.prototype, Je));
function No(i) {
	return {
		get() {
			return k(this).event[i];
		},
		set(o$1) {
			k(this).event[i] = o$1;
		},
		configurable: !0,
		enumerable: !0
	};
}
n$1(No, "defineRedirectDescriptor");
function zs(i) {
	return {
		value() {
			const o$1 = k(this).event;
			return o$1[i].apply(o$1, arguments);
		},
		configurable: !0,
		enumerable: !0
	};
}
n$1(zs, "defineCallDescriptor");
function js(i, o$1) {
	const a = Object.keys(o$1);
	if (a.length === 0) return i;
	function l(u, m) {
		i.call(this, u, m);
	}
	n$1(l, "CustomEvent"), l.prototype = Object.create(i.prototype, { constructor: {
		value: l,
		configurable: !0,
		writable: !0
	} });
	for (let u = 0; u < a.length; ++u) {
		const m = a[u];
		if (!(m in i.prototype)) {
			const S = typeof Object.getOwnPropertyDescriptor(o$1, m).value == "function";
			Object.defineProperty(l.prototype, m, S ? zs(m) : No(m));
		}
	}
	return l;
}
n$1(js, "defineWrapper");
function Ho(i) {
	if (i == null || i === Object.prototype) return Je;
	let o$1 = rn.get(i);
	return o$1 ?? (o$1 = js(Ho(Object.getPrototypeOf(i)), i), rn.set(i, o$1)), o$1;
}
n$1(Ho, "getWrapper");
function Ls(i, o$1) {
	const a = Ho(Object.getPrototypeOf(o$1));
	return new a(i, o$1);
}
n$1(Ls, "wrapEvent");
function Ds(i) {
	return k(i).immediateStopped;
}
n$1(Ds, "isStopped");
function $s(i, o$1) {
	k(i).eventPhase = o$1;
}
n$1($s, "setEventPhase");
function Ms(i, o$1) {
	k(i).currentTarget = o$1;
}
n$1(Ms, "setCurrentTarget");
function Vo(i, o$1) {
	k(i).passiveListener = o$1;
}
n$1(Vo, "setPassiveListener");
const Qo = /* @__PURE__ */ new WeakMap(), Yo = 1, Go = 2, tr = 3;
function rr(i) {
	return i !== null && typeof i == "object";
}
n$1(rr, "isObject");
function bt(i) {
	const o$1 = Qo.get(i);
	if (o$1 == null) throw new TypeError("'this' is expected an EventTarget object, but got another value.");
	return o$1;
}
n$1(bt, "getListeners");
function Us(i) {
	return {
		get() {
			let a = bt(this).get(i);
			for (; a != null;) {
				if (a.listenerType === tr) return a.listener;
				a = a.next;
			}
			return null;
		},
		set(o$1) {
			typeof o$1 != "function" && !rr(o$1) && (o$1 = null);
			const a = bt(this);
			let l = null, u = a.get(i);
			for (; u != null;) u.listenerType === tr ? l !== null ? l.next = u.next : u.next !== null ? a.set(i, u.next) : a.delete(i) : l = u, u = u.next;
			if (o$1 !== null) {
				const m = {
					listener: o$1,
					listenerType: tr,
					passive: !1,
					once: !1,
					next: null
				};
				l === null ? a.set(i, m) : l.next = m;
			}
		},
		configurable: !0,
		enumerable: !0
	};
}
n$1(Us, "defineEventAttributeDescriptor");
function Zo(i, o$1) {
	Object.defineProperty(i, `on${o$1}`, Us(o$1));
}
n$1(Zo, "defineEventAttribute");
function Ko(i) {
	function o$1() {
		pe.call(this);
	}
	n$1(o$1, "CustomEventTarget"), o$1.prototype = Object.create(pe.prototype, { constructor: {
		value: o$1,
		configurable: !0,
		writable: !0
	} });
	for (let a = 0; a < i.length; ++a) Zo(o$1.prototype, i[a]);
	return o$1;
}
n$1(Ko, "defineCustomEventTarget");
function pe() {
	if (this instanceof pe) {
		Qo.set(this, /* @__PURE__ */ new Map());
		return;
	}
	if (arguments.length === 1 && Array.isArray(arguments[0])) return Ko(arguments[0]);
	if (arguments.length > 0) {
		const i = new Array(arguments.length);
		for (let o$1 = 0; o$1 < arguments.length; ++o$1) i[o$1] = arguments[o$1];
		return Ko(i);
	}
	throw new TypeError("Cannot call a class as a function");
}
n$1(pe, "EventTarget"), pe.prototype = {
	addEventListener(i, o$1, a) {
		if (o$1 == null) return;
		if (typeof o$1 != "function" && !rr(o$1)) throw new TypeError("'listener' should be a function or an object.");
		const l = bt(this), u = rr(a), h = (u ? !!a.capture : !!a) ? Yo : Go, S = {
			listener: o$1,
			listenerType: h,
			passive: u && !!a.passive,
			once: u && !!a.once,
			next: null
		};
		let E = l.get(i);
		if (E === void 0) {
			l.set(i, S);
			return;
		}
		let w = null;
		for (; E != null;) {
			if (E.listener === o$1 && E.listenerType === h) return;
			w = E, E = E.next;
		}
		w.next = S;
	},
	removeEventListener(i, o$1, a) {
		if (o$1 == null) return;
		const l = bt(this), m = (rr(a) ? !!a.capture : !!a) ? Yo : Go;
		let h = null, S = l.get(i);
		for (; S != null;) {
			if (S.listener === o$1 && S.listenerType === m) {
				h !== null ? h.next = S.next : S.next !== null ? l.set(i, S.next) : l.delete(i);
				return;
			}
			h = S, S = S.next;
		}
	},
	dispatchEvent(i) {
		if (i == null || typeof i.type != "string") throw new TypeError("\"event.type\" should be a string.");
		const o$1 = bt(this), a = i.type;
		let l = o$1.get(a);
		if (l == null) return !0;
		const u = Ls(this, i);
		let m = null;
		for (; l != null;) {
			if (l.once ? m !== null ? m.next = l.next : l.next !== null ? o$1.set(a, l.next) : o$1.delete(a) : m = l, Vo(u, l.passive ? l.listener : null), typeof l.listener == "function") try {
				l.listener.call(this, u);
			} catch (h) {
				typeof console < "u" && typeof console.error == "function" && console.error(h);
			}
			else l.listenerType !== tr && typeof l.listener.handleEvent == "function" && l.listener.handleEvent(u);
			if (Ds(u)) break;
			l = l.next;
		}
		return Vo(u, null), $s(u, 0), Ms(u, null), !u.defaultPrevented;
	}
}, Object.defineProperty(pe.prototype, "constructor", {
	value: pe,
	configurable: !0,
	writable: !0
}), typeof window < "u" && typeof window.EventTarget < "u" && Object.setPrototypeOf(pe.prototype, window.EventTarget.prototype);
var nr = class extends pe {
	static {
		n$1(this, "AbortSignal");
	}
	constructor() {
		throw super(), new TypeError("AbortSignal cannot be constructed directly");
	}
	get aborted() {
		const o$1 = or.get(this);
		if (typeof o$1 != "boolean") throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
		return o$1;
	}
};
Zo(nr.prototype, "abort");
function xs() {
	const i = Object.create(nr.prototype);
	return pe.call(i), or.set(i, !1), i;
}
n$1(xs, "createAbortSignal");
function Ns(i) {
	or.get(i) === !1 && (or.set(i, !0), i.dispatchEvent({ type: "abort" }));
}
n$1(Ns, "abortSignal");
const or = /* @__PURE__ */ new WeakMap();
Object.defineProperties(nr.prototype, { aborted: { enumerable: !0 } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(nr.prototype, Symbol.toStringTag, {
	configurable: !0,
	value: "AbortSignal"
});
let nn = class {
	static {
		n$1(this, "AbortController");
	}
	constructor() {
		Jo.set(this, xs());
	}
	get signal() {
		return Xo(this);
	}
	abort() {
		Ns(Xo(this));
	}
};
const Jo = /* @__PURE__ */ new WeakMap();
function Xo(i) {
	const o$1 = Jo.get(i);
	if (o$1 == null) throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${i === null ? "null" : typeof i}`);
	return o$1;
}
n$1(Xo, "getSignal"), Object.defineProperties(nn.prototype, {
	signal: { enumerable: !0 },
	abort: { enumerable: !0 }
}), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(nn.prototype, Symbol.toStringTag, {
	configurable: !0,
	value: "AbortController"
});
var Hs = Object.defineProperty, Vs = n$1((i, o$1) => Hs(i, "name", {
	value: o$1,
	configurable: !0
}), "e");
const ei = Mo;
ti();
function ti() {
	!globalThis.process?.versions?.node && !globalThis.process?.env?.DISABLE_NODE_FETCH_NATIVE_WARN && console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");
}
n$1(ti, "s"), Vs(ti, "checkNodeEnvironment");

//#endregion
export { H, Xe, Yr, Ze, Zt, __commonJS, __require, __toESM, ae, ei, nn };