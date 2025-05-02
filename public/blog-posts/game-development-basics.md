---
title: Creating My First Game - A Beginner's Journey
date: 2025-04-20
author: Alora Mia
excerpt: How I made my first game with Unity and C# as a teen developer, with tips for fellow beginners.
coverImage: /images/blog/game-dev.jpg
tags: [Game Development, Unity, C#, Beginners]
featured: true
---

# Creating My First Game - A Beginner's Journey

When I decided to make my first game at 15, I had no idea where to start. After months of learning and experimenting, I finished a simple but complete 2D platformer. Here's how I did it, and how you can too!

## Choosing the Right Engine

As a beginner, I wanted something with:
- Visual tools (not just code)
- Good documentation
- Active community for help

Unity fit these requirements perfectly. It's powerful enough for professional games but approachable for beginners.

## Learning the Basics

I spent the first two weeks following tutorials and understanding:

- The Unity interface
- Basic C# programming
- GameObjects and Components
- Physics systems
- Animation basics

This foundation was crucial before I started my own project.

## My First Game Concept

Start simple! My game concept was:
- 2D platformer
- Main character: A robot cat
- Objective: Collect energy orbs while avoiding obstacles
- 5 levels of increasing difficulty

Here's a snippet of my player movement code:

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float jumpForce = 10f;
    
    private Rigidbody2D rb;
    private bool isGrounded;
    
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }
    
    void Update()
    {
        // Horizontal movement
        float moveInput = Input.GetAxisRaw("Horizontal");
        rb.velocity = new Vector2(moveInput * moveSpeed, rb.velocity.y);
        
        // Jump
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            rb.velocity = new Vector2(rb.velocity.x, jumpForce);
            isGrounded = false;
        }
    }
    
    void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = true;
        }
    }
}
```

## Assets and Art

I'm not an artist, so I used:
- Free assets from Unity Asset Store
- Simple sprites I created in Aseprite
- Music from free game music websites

Don't let art hold you back - focus on gameplay first!

## Testing and Iteration

My first version was terrible! But that's okay. I had friends test the game and give feedback, which helped me improve:
- Controls felt "floaty" → Adjusted physics values
- Difficulty spikes → Redesigned level progression
- Boring visuals → Added particle effects and camera shake

## What I Learned

Game development taught me:
- Persistence through technical challenges
- Breaking down big problems into smaller ones
- The importance of user feedback
- That making games is hard but incredibly rewarding!

Are you thinking about making a game? Start today! Begin small, be consistent, and don't get discouraged when things get tough. If I could do it as a 15-year-old with no prior experience, you can too! 