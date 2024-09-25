const init = async () => {
  try {
    const husky = (await import('husky')).default

    husky()
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e
  }

  // try {
  //   const { nextTelemetry } = (await import('next/dist/cli/next-telemetry.js')).default;

  //   nextTelemetry({ _: ['disable'], disable: true, enable: false });
  // } catch (e) {
  //   if (e.code !== 'MODULE_NOT_FOUND') throw e;
  // }
}

init()
