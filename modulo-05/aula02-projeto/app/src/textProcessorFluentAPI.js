/**
 * O objetivo do Fluent API é construir um objeto de forma fluente, ou seja,
 * de forma encadeada, onde cada método retorna o próprio objeto.
 * Como se fosse um pipeline, step by step.
 * E no fim, chama o build. Muito similar ao padrão Builder.
 * A diferença é que aqui é sobre processos, o builder é sobre construção.
 */

class TextProcessorFluentAPI {
  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // ?<= Fala que vai extrair os dados que virão depois desse grupo
    // [contratante|contratada]:\s{1} Fala que vai extrair os dados que virão depois desse grupo
    // (?!\s) Fala que não pode ter espaço em branco
    // (.*\n.*?)$ Fala que vai extrair os dados que virão depois desse grupo
    // gmi Fala que vai extrair os dados que virão depois desse grupo

    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
    const onlyPerson = this.#content.match(matchPerson)
    this.#content = onlyPerson

    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI