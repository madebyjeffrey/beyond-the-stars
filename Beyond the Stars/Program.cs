var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddReverseProxy();
}

// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.MapForwarder("{**catch-all}", "http://localhost:5173");
}

app.MapStaticAssets();
// app.MapRazorPages()
    // .WithStaticAssets();

    // var api = app.MapGroup("/api");

// Map your api endpoints
// this must come AFTER the MapForwarer call

    // api.MapGet("/some-api-endpoint", MyHandler);

app.Run();