using DeShawnsDogs.Models;

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Fido", CityId = 1, WalkerId = 1 },
    new Dog { Id = 2, Name = "Buddy", CityId = 2, WalkerId = 2 },
    new Dog { Id = 3, Name = "Charlie", CityId = 3, WalkerId = 3 },
    new Dog { Id = 4, Name = "Max", CityId = 1, WalkerId = 4 },
    new Dog { Id = 5, Name = "Cooper", CityId = 2, WalkerId = 5 },
    new Dog { Id = 6, Name = "Rocky", CityId = 3, WalkerId = 1 },
    new Dog { Id = 7, Name = "Bella", CityId = 1, WalkerId = 2 },
    new Dog { Id = 8, Name = "Lucy", CityId = 2, WalkerId = 3 },
    new Dog { Id = 9, Name = "Lola", CityId = 3, WalkerId = 4 },
    new Dog { Id = 10, Name = "Daisy", CityId = 1, WalkerId = 3 },
    new Dog { Id = 11, Name = "Luna", CityId = 3, WalkerId = 2 },
    new Dog { Id = 12, Name = "Bailey", CityId = 1, WalkerId = 5 },
    new Dog { Id = 13, Name = "Rocky", CityId = 2, WalkerId = 1 },
    new Dog { Id = 14, Name = "Oliver", CityId = 3, WalkerId = 4 },
    new Dog { Id = 15, Name = "Leo", CityId = 1, WalkerId = 2 }
};

List<City> cities = new List<City>
{
    new City { Id = 1, Name = "New York" },
    new City { Id = 2, Name = "Los Angeles" },
    new City { Id = 3, Name = "Chicago" }
};

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "Alice" },
    new Walker { Id = 2, Name = "Bob" },
    new Walker { Id = 3, Name = "Charlie" },
    new Walker { Id = 4, Name = "David" },
    new Walker { Id = 5, Name = "Eva" }
};

List<WalkerToCity> walkersToCities = new List<WalkerToCity>
{
    new WalkerToCity { Id = 1, WalkerId = 1, CityId = 1 },
    new WalkerToCity { Id = 2, WalkerId = 2, CityId = 2 },
    new WalkerToCity { Id = 3, WalkerId = 3, CityId = 3 },
    new WalkerToCity { Id = 4, WalkerId = 4, CityId = 1 },
    new WalkerToCity { Id = 5, WalkerId = 5, CityId = 2 },
    new WalkerToCity { Id = 6, WalkerId = 1, CityId = 2 },
    new WalkerToCity { Id = 7, WalkerId = 2, CityId = 3 },
    new WalkerToCity { Id = 8, WalkerId = 3, CityId = 1 },
    new WalkerToCity { Id = 9, WalkerId = 4, CityId = 2 }
};


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/dogs", () =>
{
    return dogs;
});

app.Run();
