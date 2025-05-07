// o priceFormatter é usado para formatar os valores monetários das transações, garantindo que sejam exibidos corretamente na interface do usuário. O formato utilizado é o padrão brasileiro (pt-BR), com o símbolo da moeda brasileira (R$) e duas casas decimais.
export const priceFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  