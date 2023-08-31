using DeShawnsDogs.Models;

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Fido", CityId = 1, WalkerId = 1 },
    new Dog { Id = 2, Name = "Buddy", CityId = 2, WalkerId = null},
    new Dog { Id = 3, Name = "Charlie", CityId = 3, WalkerId = 3 },
    new Dog { Id = 4, Name = "Max", CityId = 1, WalkerId = null },
    new Dog { Id = 5, Name = "Cooper", CityId = 2, WalkerId = 5 },
    new Dog { Id = 6, Name = "Rocky", CityId = 3, WalkerId = 1 },
    new Dog { Id = 7, Name = "Bella", CityId = 1, WalkerId = null },
    new Dog { Id = 8, Name = "Lucy", CityId = 2, WalkerId = 3 },
    new Dog { Id = 9, Name = "Lola", CityId = 3, WalkerId = 4 },
    new Dog { Id = 10, Name = "Daisy", CityId = 1, WalkerId = 3 },
    new Dog { Id = 11, Name = "Luna", CityId = 3, WalkerId = null },
    new Dog { Id = 12, Name = "Bailey", CityId = 1, WalkerId = 5 },
    new Dog { Id = 13, Name = "Rocky", CityId = 2, WalkerId = 1 },
    new Dog { Id = 14, Name = "Oliver", CityId = 3, WalkerId = 4 },
    new Dog { Id = 15, Name = "Leo", CityId = 1, WalkerId = null }
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

app.MapGet("/cities", () =>
{
    return cities;
});

app.MapGet("/walkers", () =>
{
    return walkers;
});

// single cityId passed in.
// filter walkersToCities by objects which include cityId; return filteredWalkersToCities
// construct list of filteredWalkers based on walkerIds present in each filteredWalkersToCities object; return filteredWalkers (assign this to "Walkers" prop)

app.MapGet("/filteredWalkers/{cityId}", (int cityId) => 
{
    List<WalkerToCity> filteredWalkersToCities = walkersToCities.Where(wtc => wtc.CityId == cityId).ToList();
    List<Walker> filteredWalkers = filteredWalkersToCities.Select(fwtc => walkers.First(w => w.Id == fwtc.WalkerId)).ToList();
    return filteredWalkers;
});

// match selected walker name to a walker Id (captured in client, sent to server).
// filter walkersToCities by walker Id. Return filteredWTC.
// filter cities by city IDs in filteredWTC. return filteredCities.
// filter dogs by cityIds present in filteredCities AND walkerId == null. return filteredDogs to client.
// map over filteredDogs (in client).

app.MapGet("/filteredDogs/{walkerId}", (int walkerId) =>
{
    List<WalkerToCity> filteredWalkersToCities = walkersToCities.Where(wtc => wtc.WalkerId == walkerId).ToList();
    // return filteredWalkersToCities;
    List<City> filteredCities = filteredWalkersToCities.Select(fwtc => cities.First(c => c.Id == fwtc.CityId)).ToList();
    // return filteredCities;
    List<Dog> filteredDogs = dogs.Where(d => filteredCities.Any(fc => d.CityId == fc.Id && d.WalkerId == null)).ToList();
    // List<Dog> filteredDogs = filteredCities.Select(fc => dogs.Where(d => d.CityId == fc.Id));
    return filteredDogs;
});

app.MapPost("/dogs", (Dog newDog) =>
{
    newDog.Id = dogs.Count > 0 ? dogs.Max(d => d.Id) + 1 : 1;
    newDog.WalkerId = null;
    dogs.Add(newDog);
    return newDog;
});

// in Program.cs: cf the "POST" (acting as a "PUT")
// pass in dogId, walkerId
// access existing dog by its ID (FirstOrDefault)
// new body: same + walkerId = foundWalker.id
// return new dog object

app.MapPost("/dogs/{dogId}/assignWalker{walkerId}", (int dogId, int walkerId) =>
{
    Dog foundDog = dogs.FirstOrDefault(d => d.Id == dogId);
    foundDog.WalkerId = walkerId;

    return foundDog;
});

app.MapDelete("/dogs/{id}", (int id) =>
{
    Dog dogToDestroy = dogs.FirstOrDefault(dog => dog.Id == id);
    Console.WriteLine(dogToDestroy.Name);
    Console.WriteLine(dogToDestroy.Id);
    if (dogToDestroy == null)
    {
        return Results.NotFound();
    }
    // the below LINQ method (.RemoveAt) will occasionally return errors. It finds by index, when we have been doing operations by Id.
    // dogs.RemoveAt(id - 1);
    dogs.RemoveAll(dog => dog.Id == dogToDestroy.Id);
    return Results.Ok();
});

app.Run();
