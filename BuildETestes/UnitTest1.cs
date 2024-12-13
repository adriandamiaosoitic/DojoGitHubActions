namespace BuildETestes;

public class UnitTest1
{
    [Fact]
    public void GaranteQueSomaFunciona()
    {
        var numero1 = 11;
        var numero2 = 100;
        var teste = "";
        Assert.Equal(numero1 + numero2, Somar(numero1, numero2));
    }

    int Somar(int numero1, int numero2) => numero1 * numero2;
}