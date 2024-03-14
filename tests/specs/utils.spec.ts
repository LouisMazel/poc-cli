import { printInformationCli } from 'src/utils/print-banner'

describe('utils', () => {
  describe('function: printInformationCli', () => {
    test('should print information of cli with console.log', () => {
      const spy = vi.spyOn(console, 'log')

      printInformationCli('1.0.0')

      expect(spy).toHaveBeenCalledWith('Adeo-CLI')
      expect(spy).toHaveBeenCalledWith('version v1.0.0')
    })
  })
})
