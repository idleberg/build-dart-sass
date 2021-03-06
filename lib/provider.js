/*! For license information please see provider.js.LICENSE.txt */
module.exports = (() => {
  'use strict';
  var e = {
      558: (e, n, t) => {
        Object.defineProperty(n, '__esModule', { value: !0 });
        var r = t(87),
          a = t(129),
          o = t(747),
          i = t(622);
        function s(e) {
          return e && 'object' == typeof e && 'default' in e
            ? e
            : { default: e };
        }
        var l = s(r),
          c = s(o),
          u = s(i);
        const d = /\s+at.*(?:\(|\s)(.*)\)?/,
          p = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/,
          f = void 0 === l.default.homedir ? '' : l.default.homedir();
        class m extends Error {
          constructor(e) {
            if (!Array.isArray(e))
              throw new TypeError(
                'Expected input to be an Array, got ' + typeof e
              );
            let n = (e = [...e].map((e) =>
              e instanceof Error
                ? e
                : null !== e && 'object' == typeof e
                ? Object.assign(new Error(e.message), e)
                : new Error(e)
            ))
              .map((e) => {
                return 'string' == typeof e.stack
                  ? ((e) =>
                      e.replace(
                        /\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g,
                        ''
                      ))(
                      ((n = e.stack),
                      (t = Object.assign({ pretty: !1 }, t)),
                      n
                        .replace(/\\/g, '/')
                        .split('\n')
                        .filter((e) => {
                          const n = e.match(d);
                          if (null === n || !n[1]) return !0;
                          const t = n[1];
                          return (
                            !t.includes(
                              '.app/Contents/Resources/electron.asar'
                            ) &&
                            !t.includes(
                              '.app/Contents/Resources/default_app.asar'
                            ) &&
                            !p.test(t)
                          );
                        })
                        .filter((e) => '' !== e.trim())
                        .map((e) =>
                          t.pretty
                            ? e.replace(d, (e, n) =>
                                e.replace(n, n.replace(f, '~'))
                              )
                            : e
                        )
                        .join('\n'))
                    )
                  : String(e);
                var n, t;
              })
              .join('\n');
            (n =
              '\n' +
              ((e, n = 1, t) => {
                if (
                  ((t = { indent: ' ', includeEmptyLines: !1, ...t }),
                  'string' != typeof e)
                )
                  throw new TypeError(
                    `Expected \`input\` to be a \`string\`, got \`${typeof e}\``
                  );
                if ('number' != typeof n)
                  throw new TypeError(
                    `Expected \`count\` to be a \`number\`, got \`${typeof n}\``
                  );
                if ('string' != typeof t.indent)
                  throw new TypeError(
                    `Expected \`options.indent\` to be a \`string\`, got \`${typeof t.indent}\``
                  );
                if (0 === n) return e;
                const r = t.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
                return e.replace(r, t.indent.repeat(n));
              })(n, 4)),
              super(n),
              (this.name = 'AggregateError'),
              Object.defineProperty(this, '_errors', { value: e });
          }
          *[Symbol.iterator]() {
            for (const e of this._errors) yield e;
          }
        }
        var g = m;
        const y = (e, n, t) =>
          new Promise((r, a) => {
            if (
              ((t = Object.assign({ concurrency: 1 / 0 }, t)),
              'function' != typeof n)
            )
              throw new TypeError('Mapper function is required');
            const { concurrency: o } = t;
            if (!('number' == typeof o && o >= 1))
              throw new TypeError(
                `Expected \`concurrency\` to be a number from 1 and up, got \`${o}\` (${typeof o})`
              );
            const i = [],
              s = e[Symbol.iterator]();
            let l = !1,
              c = !1,
              u = 0,
              d = 0;
            const p = () => {
              if (l) return;
              const e = s.next(),
                t = d;
              if ((d++, e.done)) return (c = !0), void (0 === u && r(i));
              u++,
                Promise.resolve(e.value)
                  .then((e) => n(e, t))
                  .then(
                    (e) => {
                      (i[t] = e), u--, p();
                    },
                    (e) => {
                      (l = !0), a(e);
                    }
                  );
            };
            for (let e = 0; e < o && (p(), !c); e++);
          });
        var h = y,
          v = y;
        h.default = v;
        const w = async (e, n, t) =>
          (await h(e, (e, t) => Promise.all([n(e, t), e]), t))
            .filter((e) => Boolean(e[0]))
            .map((e) => e[1]);
        var b = w,
          k = w;
        b.default = k;
        const E = 'undefined' != typeof atom,
          S =
            'undefined' != typeof atom &&
            (atom.inDevMode() || atom.inSpecMode()),
          x = 'atom-package-deps.ignored';
        var P = /["'&<>]/,
          A = function (e) {
            var n,
              t = '' + e,
              r = P.exec(t);
            if (!r) return t;
            var a = '',
              o = 0,
              i = 0;
            for (o = r.index; o < t.length; o++) {
              switch (t.charCodeAt(o)) {
                case 34:
                  n = '&quot;';
                  break;
                case 38:
                  n = '&amp;';
                  break;
                case 39:
                  n = '&#39;';
                  break;
                case 60:
                  n = '&lt;';
                  break;
                case 62:
                  n = '&gt;';
                  break;
                default:
                  continue;
              }
              i !== o && (a += t.substring(i, o)), (i = o + 1), (a += n);
            }
            return i !== o ? a + t.substring(i, o) : a;
          };
        const j = E
          ? async function (e) {
              return atom.packages.resolvePackagePath(e);
            }
          : async function (e) {
              var n;
              const t = u.default.join(
                null !== (n = process.env.ATOM_HOME) && void 0 !== n
                  ? n
                  : u.default.join(l.default.homedir(), '.atom'),
                'packages',
                e
              );
              try {
                return (
                  await c.default.promises.access(t, c.default.constants.R_OK),
                  t
                );
              } catch (e) {
                return null;
              }
            };
        function T(e, n) {
          if (!e) throw new Error(null != n ? n : 'Invariant violation');
        }
        async function _(e) {
          if (null == e.directory) return !0;
          if (null == e.minimumVersion) return !1;
          const n = await (async function (e) {
            if (E) {
              const n = await (async function (e) {
                var n;
                const t = atom.packages.getLoadedPackage(e.name);
                return null == t
                  ? null
                  : null !== (n = t.metadata.version) && void 0 !== n
                  ? n
                  : null;
              })(e);
              if (n) return n;
            }
            return (async function (e) {
              var n, t;
              const { directory: r } = e;
              if (null == r) return null;
              let a = null;
              try {
                a = JSON.parse(
                  await c.default.promises.readFile(
                    u.default.join(r, 'package.json'),
                    'utf8'
                  )
                );
              } catch (e) {
                return null;
              }
              return null !==
                (n = null === (t = a) || void 0 === t ? void 0 : t.version) &&
                void 0 !== n
                ? n
                : null;
            })(e);
          })(e);
          return (
            null == n ||
            1 ===
              (function (e, n) {
                for (
                  var t = e.split('.'), r = n.split('.'), a = 0;
                  a < 3;
                  a++
                ) {
                  var o = Number(t[a]),
                    i = Number(r[a]);
                  if (o > i) return 1;
                  if (i > o) return -1;
                  if (!isNaN(o) && isNaN(i)) return 1;
                  if (isNaN(o) && !isNaN(i)) return -1;
                }
                return 0;
              })(e.minimumVersion, n)
          );
        }
        const $ = new Set(['✓', 'done']),
          N = /(?:Installing|Moving) (.*?) to .* (.*)/;
        let C = !0;
        const D = E
            ? function ({ packageName: e, dependencies: n }) {
                const t = [],
                  r = atom.notifications.addInfo(
                    `Installing ${e} dependencies`,
                    {
                      detail: `Installing ${n.map((e) => e.name).join(', ')}`,
                      dismissable: !0,
                    }
                  ),
                  a = document.createElement('progress');
                (a.max = n.length), (a.style.width = '100%');
                try {
                  var o;
                  const e = atom.views.getView(r),
                    n =
                      null !== (o = null == e ? void 0 : e.element) &&
                      void 0 !== o
                        ? o
                        : null;
                  if (null == n)
                    throw new Error(
                      'Unable to get notification element from view'
                    );
                  const t = n.querySelector('.detail-content');
                  if (null == t)
                    throw new Error(
                      'Content detail container not found inside the notification'
                    );
                  t.appendChild(a);
                } catch (e) {
                  console.error(
                    '[Package-Deps] Error during showing installation progress to user',
                    e
                  );
                }
                return {
                  handleFailure({ dependency: e, error: n }) {
                    var r;
                    t.push(e.name),
                      (a.value += 1),
                      console.error(
                        `[Package-Deps] Unable to install ${e.name}, Error:`,
                        null !== (r = null == n ? void 0 : n.stack) &&
                          void 0 !== r
                          ? r
                          : n
                      );
                  },
                  handleDependencyInstalled(e) {
                    a.value += 1;
                  },
                  handleComplete() {
                    r.dismiss(),
                      t.length > 0
                        ? atom.notifications.addWarning(
                            `Failed to install ${e} dependencies`,
                            {
                              detail: `These packages were not installed, check your console\nfor more info.\n${t.join(
                                '\n'
                              )}`,
                              dismissable: !0,
                            }
                          )
                        : atom.notifications.addSuccess(
                            `Installed ${e} dependencies`,
                            {
                              detail: `Installed ${n
                                .map((e) => e.name)
                                .join(', ')}`,
                            }
                          ),
                      Promise.all(
                        n.map((e) =>
                          t.includes(e.name)
                            ? null
                            : atom.packages.activatePackage(e.name)
                        )
                      ).catch((n) => {
                        console.error(
                          `[Package-Deps] Error activating installed packages for ${e}`,
                          n
                        );
                      });
                  },
                };
              }
            : function ({ dependencies: e }) {
                let n = !1;
                return (
                  console.log(
                    `Installing dependencies:\n${e
                      .map((e) => `  - ${e.name}`)
                      .join('\n')}`
                  ),
                  {
                    handleFailure({ dependency: e, error: t }) {
                      var r;
                      (n = !0),
                        console.error(
                          `Unable to install ${e.name}, Error:`,
                          null !== (r = null == t ? void 0 : t.stack) &&
                            void 0 !== r
                            ? r
                            : t
                        );
                    },
                    handleDependencyInstalled(e) {
                      console.log('Successfully installed', e.name);
                    },
                    handleComplete() {
                      console.log('Installation complete'),
                        n && (process.exitCode = 1);
                    },
                  }
                );
              },
          I = E
            ? function ({ packageName: e, dependencies: n }) {
                return new Promise((t) => {
                  const r = n.filter((e) => !Array.isArray(e)),
                    a = n.filter((e) => Array.isArray(e)),
                    o = 0 === a.length,
                    i = o
                      ? r.map((e) => e.name).join(', ')
                      : 'Something went wrong. Check your developer console',
                    s = a.map((e) => e[0]),
                    l = atom.notifications.addInfo(
                      `${e} needs to install dependencies`,
                      {
                        dismissable: !0,
                        icon: 'cloud-download',
                        detail: i,
                        description: `Install dependenc${
                          1 === n.length ? 'y' : 'ies'
                        }?`,
                        buttons: [
                          {
                            text: 'Yes',
                            onDidClick: () => {
                              t(o ? [] : r.concat(s)), l.dismiss();
                            },
                          },
                          {
                            text: 'No Thanks',
                            onDidClick: () => {
                              l.dismiss();
                            },
                          },
                          {
                            text: 'Never',
                            onDidClick: () => {
                              !(function (e) {
                                var n;
                                if (!E) return;
                                const t = new Set(
                                  null !== (n = atom.config.get(x)) &&
                                  void 0 !== n
                                    ? n
                                    : []
                                );
                                t.add(e), atom.config.set(x, Array.from(t));
                              })(e),
                                C &&
                                  ((C = !1),
                                  atom.notifications.addInfo(
                                    'How to reset package-deps memory',
                                    {
                                      dismissable: !0,
                                      description:
                                        "To modify the list of ignored files invoke 'Application: Open Your Config' and change the 'atom-package-deps' section",
                                    }
                                  )),
                                l.dismiss();
                            },
                          },
                        ],
                      }
                    );
                  if ((l.onDidDismiss(() => t([])), !o))
                    try {
                      var c;
                      const e = atom.views.getView(l),
                        n =
                          null !== (c = null == e ? void 0 : e.element) &&
                          void 0 !== c
                            ? c
                            : null;
                      if (null == n)
                        throw new Error(
                          'Unable to get notification element from view'
                        );
                      const t = n.querySelector('.detail-content');
                      if (null == t)
                        throw new Error(
                          'Content detail container not found inside the notification'
                        );
                      if (((t.innerHTML = ''), r.length > 0)) {
                        const e = document.createElement('div');
                        (e.innerHTML = `Packages without choices: <br /><ul><li>${r
                          .map((e) => A(e.name))
                          .join('</li><li>')}</li></ul>`),
                          t.appendChild(e);
                      }
                      const o = document.createElement('div');
                      (o.innerHTML = 'Packages with choices:'),
                        t.appendChild(o);
                      const i = document.createElement('ul');
                      a.forEach((e, n) => {
                        const t = document.createElement('li'),
                          r = document.createElement('select');
                        (r.innerHTML = e
                          .map((e) => `<option>${A(e.name)}</option>`)
                          .join('\n')),
                          r.addEventListener('change', () => {
                            const t = e.find((e) => e.name === r.value);
                            null != t && (s[n] = t);
                          }),
                          (t.style.marginTop = '5px'),
                          t.appendChild(r),
                          i.appendChild(t);
                      }),
                        t.appendChild(i);
                    } catch (e) {
                      console.error(
                        '[Package-Deps] Error during showing package choices to user',
                        e
                      );
                    }
                });
              }
            : async function ({ dependencies: e }) {
                return e.map((e) => (Array.isArray(e) ? e[0] : e));
              };
        n.install = async function (e) {
          if (
            (T(
              'string' == typeof e && e.length > 0,
              '[Package-Deps] Package name is required'
            ),
            (n = e),
            E &&
              ((null !== (t = atom.config.get(x)) && void 0 !== t
                ? t
                : []
              ).includes(n) ||
                (atom.packages.isPackageDisabled('notifications') &&
                  (console.warn(
                    `Enable notifications to install dependencies for ${n}`
                  ),
                  1))))
          )
            return;
          var n, t;
          const r = await (async function (e) {
            const n = await (E
              ? (async function (e) {
                  const n = atom.packages.getLoadedPackage(e),
                    t = n && n.metadata['package-deps'];
                  return Array.isArray(t) ? t : [];
                })(e)
              : (async function (e) {
                  let n = null;
                  try {
                    n = await c.default.promises.stat(e);
                  } catch (e) {}
                  if (null == n || !n.isDirectory())
                    throw new Error(
                      '[Package-Deps] Expected packageName to be a readable directory in Node.js invocation'
                    );
                  let t = null;
                  try {
                    const n = await c.default.promises.readFile(
                      u.default.join(e, 'package.json'),
                      'utf8'
                    );
                    t = JSON.parse(n);
                  } catch (e) {}
                  const r =
                    null == t || 'object' != typeof t ? [] : t['package-deps'];
                  return Array.isArray(r) ? r : [];
                })(e));
            return (
              S &&
                (T(
                  Array.isArray(n),
                  `Dependencies for ${e} are not a valid array`
                ),
                n.forEach((n, t) => {
                  if (Array.isArray(n))
                    n.forEach((n, r) => {
                      const a = `Dependency#${t}#${r} for ${e} is invalid`;
                      T('string' == typeof n.name && n.name.length > 0, a),
                        T(
                          null == n.minimumVersion ||
                            ('string' == typeof n.minimumVersion &&
                              n.minimumVersion.length > 0),
                          a
                        );
                    }),
                      T(
                        n.length > 0,
                        `Dependency#${t} for ${e} has no group items`
                      );
                  else {
                    const r = `Dependency#${t} for ${e} is invalid`;
                    T('string' == typeof n.name && n.name.length > 0, r),
                      T(
                        null == n.minimumVersion ||
                          ('string' == typeof n.minimumVersion &&
                            n.minimumVersion.length > 0),
                        r
                      );
                  }
                })),
              n
            );
          })(e);
          if (0 === r.length) return;
          const o = await Promise.all(
              r.map(async (e) =>
                Array.isArray(e)
                  ? Promise.all(
                      e.map(async (e) => ({ ...e, directory: await j(e.name) }))
                    )
                  : { ...e, directory: await j(e.name) }
              )
            ),
            i = await b(o, async function (e) {
              return Array.isArray(e)
                ? (await Promise.all(e.map((e) => _(e)))).every(Boolean)
                : _(e);
            });
          if (0 === i.length) return;
          const s = await I({ packageName: e, dependencies: i });
          if (0 === s.length) return;
          const l = D({ packageName: e, dependencies: s });
          await (async (
            e,
            n,
            { concurrency: t = 1 / 0, stopOnError: r = !0 } = {}
          ) =>
            new Promise((a, o) => {
              if ('function' != typeof n)
                throw new TypeError('Mapper function is required');
              if ((!Number.isSafeInteger(t) && t !== 1 / 0) || !(t >= 1))
                throw new TypeError(
                  `Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${t}\` (${typeof t})`
                );
              const i = [],
                s = [],
                l = e[Symbol.iterator]();
              let c = !1,
                u = !1,
                d = 0,
                p = 0;
              const f = () => {
                if (c) return;
                const e = l.next(),
                  t = p;
                if ((p++, e.done))
                  return (
                    (u = !0),
                    void (0 === d && (r || 0 === s.length ? a(i) : o(new g(s))))
                  );
                d++,
                  (async () => {
                    try {
                      const r = await e.value;
                      (i[t] = await n(r, t)), d--, f();
                    } catch (e) {
                      r ? ((c = !0), o(e)) : (s.push(e), d--, f());
                    }
                  })();
              };
              for (let e = 0; e < t && (f(), !u); e++);
            }))(
            s,
            async function (e) {
              try {
                await (async function (e) {
                  const n = E ? atom.packages.getApmPath() : 'apm',
                    { stdout: t, stderr: r } = await (function (e, n, t) {
                      let r;
                      const o = (async function (e, n, t) {
                        const r = a.spawn(e, n, t),
                          o = new Promise((e, n) => {
                            const a = {
                              stdout: r.stdout ? [] : null,
                              stderr: r.stderr ? [] : null,
                            };
                            r.on('error', n),
                              r.stdout &&
                                r.stdout.on('data', function (e) {
                                  a.stdout.push(e),
                                    t.handleStdout && t.handleStdout(e);
                                }),
                              r.stderr &&
                                r.stderr.on('data', function (e) {
                                  a.stderr.push(e),
                                    t.handleStderr && t.handleStderr(e);
                                }),
                              r.on('close', (n) => {
                                let r = null;
                                null != a.stdout &&
                                  (r =
                                    null === t.encoding ||
                                    'buffer' === t.encoding
                                      ? Buffer.concat(a.stdout)
                                      : a.stdout.join(''));
                                let o = null;
                                null != a.stderr &&
                                  (o =
                                    null === t.encoding ||
                                    'buffer' === t.encoding
                                      ? Buffer.concat(a.stderr)
                                      : a.stderr.join('')),
                                  e({ exitCode: n, stdout: r, stderr: o });
                              });
                          });
                        return t.handleChildProcess(r), o;
                      })(e, n, {
                        ...t,
                        handleChildProcess(e) {
                          r = e;
                        },
                      });
                      return (
                        (o.kill = function (e) {
                          return r.kill(e);
                        }),
                        o
                      );
                    })(n, [
                      'install',
                      e.name,
                      '--production',
                      '--color',
                      'false',
                    ]),
                    o = N.exec(t.trim());
                  if (null != o && $.has(o[2])) return;
                  const i = new Error(`Error installing dependency: ${e.name}`);
                  throw ((i.stack = r.trim()), i);
                })(e),
                  l.handleDependencyInstalled(e);
              } catch (n) {
                l.handleFailure({ dependency: e, error: n });
              }
            },
            { concurrency: 2 }
          ),
            l.handleComplete();
        };
      },
      549: function (e, n, t) {
        var r =
            (this && this.__awaiter) ||
            function (e, n, t, r) {
              return new (t || (t = Promise))(function (a, o) {
                function i(e) {
                  try {
                    l(r.next(e));
                  } catch (e) {
                    o(e);
                  }
                }
                function s(e) {
                  try {
                    l(r.throw(e));
                  } catch (e) {
                    o(e);
                  }
                }
                function l(e) {
                  var n;
                  e.done
                    ? a(e.value)
                    : ((n = e.value),
                      n instanceof t
                        ? n
                        : new t(function (e) {
                            e(n);
                          })).then(i, s);
                }
                l((r = r.apply(e, n || [])).next());
              });
            },
          a =
            (this && this.__generator) ||
            function (e, n) {
              var t,
                r,
                a,
                o,
                i = {
                  label: 0,
                  sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (o = { next: s(0), throw: s(1), return: s(2) }),
                'function' == typeof Symbol &&
                  (o[Symbol.iterator] = function () {
                    return this;
                  }),
                o
              );
              function s(o) {
                return function (s) {
                  return (function (o) {
                    if (t)
                      throw new TypeError('Generator is already executing.');
                    for (; i; )
                      try {
                        if (
                          ((t = 1),
                          r &&
                            (a =
                              2 & o[0]
                                ? r.return
                                : o[0]
                                ? r.throw || ((a = r.return) && a.call(r), 0)
                                : r.next) &&
                            !(a = a.call(r, o[1])).done)
                        )
                          return a;
                        switch (
                          ((r = 0), a && (o = [2 & o[0], a.value]), o[0])
                        ) {
                          case 0:
                          case 1:
                            a = o;
                            break;
                          case 4:
                            return i.label++, { value: o[1], done: !1 };
                          case 5:
                            i.label++, (r = o[1]), (o = [0]);
                            continue;
                          case 7:
                            (o = i.ops.pop()), i.trys.pop();
                            continue;
                          default:
                            if (
                              !(
                                (a =
                                  (a = i.trys).length > 0 && a[a.length - 1]) ||
                                (6 !== o[0] && 2 !== o[0])
                              )
                            ) {
                              i = 0;
                              continue;
                            }
                            if (
                              3 === o[0] &&
                              (!a || (o[1] > a[0] && o[1] < a[3]))
                            ) {
                              i.label = o[1];
                              break;
                            }
                            if (6 === o[0] && i.label < a[1]) {
                              (i.label = a[1]), (a = o);
                              break;
                            }
                            if (a && i.label < a[2]) {
                              (i.label = a[2]), i.ops.push(o);
                              break;
                            }
                            a[2] && i.ops.pop(), i.trys.pop();
                            continue;
                        }
                        o = n.call(e, i);
                      } catch (e) {
                        (o = [6, e]), (r = 0);
                      } finally {
                        t = a = 0;
                      }
                    if (5 & o[0]) throw o[1];
                    return { value: o[0] ? o[1] : void 0, done: !0 };
                  })([o, s]);
                };
              }
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.readManifestSync = n.readManifest = void 0);
        var o = t(622),
          i = o.resolve,
          s = o.sep,
          l = t(747),
          c = l.promises,
          u = l.readFileSync,
          d = t(184);
        function p(e) {
          var n, t;
          e = (null == e ? void 0 : e.length)
            ? e
            : ((n = d().getFileName()),
              ((null ==
              (t = atom.packages.getPackageDirPaths().filter(function (e) {
                return n.startsWith(e);
              }))
                ? void 0
                : t.length) &&
                n
                  .replace(t[0], '')
                  .split(s)
                  .filter(function (e) {
                    return e;
                  })[0]) ||
                '');
          var r = atom.packages.resolvePackagePath(e);
          return i(r, 'package.json');
        }
        (n.readManifest = function (e) {
          return (
            void 0 === e && (e = ''),
            r(this, void 0, void 0, function () {
              var n, t;
              return a(this, function (r) {
                switch (r.label) {
                  case 0:
                    (n = p(e)), (r.label = 1);
                  case 1:
                    return r.trys.push([1, 3, , 4]), [4, c.readFile(n, 'utf8')];
                  case 2:
                    return (t = r.sent()), [2, JSON.parse(t)];
                  case 3:
                    return r.sent(), [2, null];
                  case 4:
                    return [2];
                }
              });
            })
          );
        }),
          (n.readManifestSync = function (e) {
            void 0 === e && (e = '');
            var n = p(e);
            try {
              var t = u(n, 'utf8');
              return JSON.parse(t);
            } catch (e) {
              return null;
            }
          });
      },
      142: function (e, n, t) {
        var r =
            (this && this.__assign) ||
            function () {
              return (r =
                Object.assign ||
                function (e) {
                  for (var n, t = 1, r = arguments.length; t < r; t++)
                    for (var a in (n = arguments[t]))
                      Object.prototype.hasOwnProperty.call(n, a) &&
                        (e[a] = n[a]);
                  return e;
                }).apply(this, arguments);
            },
          a =
            (this && this.__awaiter) ||
            function (e, n, t, r) {
              return new (t || (t = Promise))(function (a, o) {
                function i(e) {
                  try {
                    l(r.next(e));
                  } catch (e) {
                    o(e);
                  }
                }
                function s(e) {
                  try {
                    l(r.throw(e));
                  } catch (e) {
                    o(e);
                  }
                }
                function l(e) {
                  var n;
                  e.done
                    ? a(e.value)
                    : ((n = e.value),
                      n instanceof t
                        ? n
                        : new t(function (e) {
                            e(n);
                          })).then(i, s);
                }
                l((r = r.apply(e, n || [])).next());
              });
            },
          o =
            (this && this.__generator) ||
            function (e, n) {
              var t,
                r,
                a,
                o,
                i = {
                  label: 0,
                  sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (o = { next: s(0), throw: s(1), return: s(2) }),
                'function' == typeof Symbol &&
                  (o[Symbol.iterator] = function () {
                    return this;
                  }),
                o
              );
              function s(o) {
                return function (s) {
                  return (function (o) {
                    if (t)
                      throw new TypeError('Generator is already executing.');
                    for (; i; )
                      try {
                        if (
                          ((t = 1),
                          r &&
                            (a =
                              2 & o[0]
                                ? r.return
                                : o[0]
                                ? r.throw || ((a = r.return) && a.call(r), 0)
                                : r.next) &&
                            !(a = a.call(r, o[1])).done)
                        )
                          return a;
                        switch (
                          ((r = 0), a && (o = [2 & o[0], a.value]), o[0])
                        ) {
                          case 0:
                          case 1:
                            a = o;
                            break;
                          case 4:
                            return i.label++, { value: o[1], done: !1 };
                          case 5:
                            i.label++, (r = o[1]), (o = [0]);
                            continue;
                          case 7:
                            (o = i.ops.pop()), i.trys.pop();
                            continue;
                          default:
                            if (
                              !(
                                (a =
                                  (a = i.trys).length > 0 && a[a.length - 1]) ||
                                (6 !== o[0] && 2 !== o[0])
                              )
                            ) {
                              i = 0;
                              continue;
                            }
                            if (
                              3 === o[0] &&
                              (!a || (o[1] > a[0] && o[1] < a[3]))
                            ) {
                              i.label = o[1];
                              break;
                            }
                            if (6 === o[0] && i.label < a[1]) {
                              (i.label = a[1]), (a = o);
                              break;
                            }
                            if (a && i.label < a[2]) {
                              (i.label = a[2]), i.ops.push(o);
                              break;
                            }
                            a[2] && i.ops.pop(), i.trys.pop();
                            continue;
                        }
                        o = n.call(e, i);
                      } catch (e) {
                        (o = [6, e]), (r = 0);
                      } finally {
                        t = a = 0;
                      }
                    if (5 & o[0]) throw o[1];
                    return { value: o[0] ? o[1] : void 0, done: !0 };
                  })([o, s]);
                };
              }
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.satisfyDependencies = void 0);
        var i = t(558),
          s = t(549),
          l = { logger: console.log };
        n.satisfyDependencies = function (e, n) {
          return (
            void 0 === n && (n = {}),
            a(this, void 0, void 0, function () {
              var t, a;
              return o(this, function (o) {
                switch (o.label) {
                  case 0:
                    return (t = r(r({}, l), n)), [4, s.readManifest(e)];
                  case 1:
                    return (a = o.sent()), [4, i.install(a.name)];
                  case 2:
                    return (
                      o.sent(),
                      (function (e, n) {
                        n.enableDependencies &&
                          e['package-deps'].map(function (t) {
                            atom.packages.isPackageDisabled(t) &&
                              (atom.inDevMode() &&
                                n.logger(
                                  '[' +
                                    e.name +
                                    "] Enabling package dependency '" +
                                    t +
                                    "'"
                                ),
                              atom.packages.enablePackage(t));
                          });
                      })(a['package-deps'], t),
                      [2]
                    );
                }
              });
            })
          );
        };
      },
      589: (e, n, t) => {
        t.r(n),
          t.d(n, {
            activate: () => d,
            config: () => a,
            provideBuilder: () => u,
          });
        const r = JSON.parse('{"u2":"build-dart-sass"}'),
          a = {
            pathToSass: {
              title: 'Path to Sass',
              description: 'Specify a custom path to the `sass` binary',
              type: 'string',
              default: 'sass',
              order: 0,
            },
            customArguments: {
              title: 'Custom Arguments',
              description:
                'Specify your preferred arguments for Sass, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
              type: 'string',
              default:
                '--style expanded {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.css',
              order: 1,
            },
            manageDependencies: {
              title: 'Manage Dependencies',
              description:
                'When enabled, third-party dependencies will be installed automatically',
              type: 'boolean',
              default: !0,
              order: 2,
            },
            alwaysEligible: {
              title: 'Always Eligible',
              description:
                'The build provider will be available in your project, even when not eligible',
              type: 'boolean',
              default: !1,
              order: 3,
            },
          };
        function o(e) {
          return atom.config.get(`${r.u2}.${e}`);
        }
        const i = require('events');
        var s = t(142),
          l = t(129),
          c = t(87);
        function u() {
          return class extends i.EventEmitter {
            constructor(e) {
              super(),
                (this.cwd = e),
                atom.config.observe('build-dart-sass.customArguments', () =>
                  this.emit('refresh')
                );
            }
            getNiceName() {
              return 'Sass';
            }
            isEligible() {
              var e, n;
              return (
                !0 === o('alwaysEligible') ||
                !(
                  null ===
                    (e = (0, l.spawnSync)(
                      'win32' === (0, c.platform)() ? 'where' : 'which',
                      [o('pathToSass')]
                    ).stdout) ||
                  void 0 === e ||
                  null === (n = e.toString()) ||
                  void 0 === n ||
                  !n.length
                )
              );
            }
            settings() {
              const e = [
                  '\\s*file://(?<file>.*) (?<line>\\d+):(?<column>\\d+)',
                ],
                n = o('pathToSass') || 'sass';
              return [
                {
                  name: 'Sass',
                  exec: n,
                  args: ['{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css'],
                  cwd: '{FILE_ACTIVE_PATH}',
                  sh: !1,
                  atomCommandName: 'dart-sass:compile',
                  errorMatch: e,
                },
                {
                  name: 'Sass (user)',
                  exec: n,
                  args: o('customArguments').trim().split(' '),
                  cwd: '{FILE_ACTIVE_PATH}',
                  sh: !1,
                  atomCommandName: 'dart-sass:compile-with-user-settings',
                  errorMatch: e,
                },
              ];
            }
          };
        }
        async function d() {
          !0 === o('manageDependencies') && (0, s.satisfyDependencies)(r.u2);
        }
      },
      184: (e, n, t) => {
        const r = t(78);
        e.exports = ({ depth: e = 0 } = {}) => {
          const n = [],
            t = new Set();
          for (const a of r()) {
            const r = a.getFileName(),
              o = null !== a.getTypeName() && null !== r;
            if ((t.has(r) || (t.add(r), n.unshift(a)), o)) return n[e];
          }
        };
      },
      78: (e) => {
        const n = () => {
          const e = Error.prepareStackTrace;
          Error.prepareStackTrace = (e, n) => n;
          const n = new Error().stack.slice(1);
          return (Error.prepareStackTrace = e), n;
        };
        (e.exports = n), (e.exports.default = n);
      },
      129: (e) => {
        e.exports = require('child_process');
      },
      747: (e) => {
        e.exports = require('fs');
      },
      87: (e) => {
        e.exports = require('os');
      },
      622: (e) => {
        e.exports = require('path');
      },
    },
    n = {};
  function t(r) {
    if (n[r]) return n[r].exports;
    var a = (n[r] = { exports: {} });
    return e[r].call(a.exports, a, a.exports, t), a.exports;
  }
  return (
    (t.d = (e, n) => {
      for (var r in n)
        t.o(n, r) &&
          !t.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
    }),
    (t.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n)),
    (t.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    t(589)
  );
})();
//# sourceMappingURL=provider.js.map
