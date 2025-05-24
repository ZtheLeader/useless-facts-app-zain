import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteItemComponent } from './favorite-item.component';
import { SavedFact } from '../../../core/models/fact.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  template: `
    <app-favorite-item
      [fact]="testFact"
      (remove)="onRemoveFact($event)">
    </app-favorite-item>
  `,
  standalone: false
})
class TestHostComponent {
  @ViewChild(FavoriteItemComponent, { static: true })
  favoriteItemComponent!: FavoriteItemComponent;

  testFact: SavedFact = {
    id: 'fact-123',
    text: 'This is a test fact',
    source: 'Test Source',
    language: 'en',
    permalink: 'http://test.com',
    savedDate: new Date('2023-01-01')
  };

  removedFactId: string | null = null;

  onRemoveFact(factId: string): void {
    this.removedFactId = factId;
  }
}

describe('FavoriteItemComponent', () => {
  let component: FavoriteItemComponent;
  let fixture: ComponentFixture<FavoriteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FavoriteItemComponent
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteItemComponent);
    component = fixture.componentInstance;

    component.fact = {
      id: 'fact-123',
      text: 'This is a test fact',
      source: 'Test Source',
      language: 'en',
      permalink: 'http://test.com',
      savedDate: new Date('2023-01-01')
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the fact text correctly', () => {
    const textElement = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement;
    expect(textElement.textContent).toContain(component.fact.text);
  });  it('should display the saved date', () => {
    const dateElement = fixture.debugElement.query(By.css('mat-card-content p:nth-child(2)')).nativeElement;
    expect(dateElement.textContent).toContain('Saved:');

    expect(dateElement.textContent).toContain('2023');
  });

  it('should emit remove event when remove button is clicked', () => {
    const removeSpy = spyOn(component.remove, 'emit');

    const removeButton = fixture.debugElement.query(By.css('button[aria-label="Remove fact from favorites"]'));
    removeButton.triggerEventHandler('click', null);

    expect(removeSpy).toHaveBeenCalledWith(component.fact.id);
  });

  it('should not emit anything if fact is null', () => {
    const removeSpy = spyOn(component.remove, 'emit');

    component.fact = undefined as any;

    component.onRemove();

    expect(removeSpy).not.toHaveBeenCalled();
  });
});

describe('FavoriteItemComponent - Host Component Tests', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FavoriteItemComponent,
        TestHostComponent
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should receive input fact correctly', () => {
    expect(hostComponent.favoriteItemComponent.fact).toEqual(hostComponent.testFact);
  });

  it('should emit remove event to parent when remove button is clicked', () => {
    // Find the delete button in the child component
    const removeButton = fixture.debugElement.query(By.css('button[aria-label="Remove fact from favorites"]'));

    // Click the button
    removeButton.triggerEventHandler('click', null);

    // Verify that the host component received the event with the correct ID
    expect(hostComponent.removedFactId).toEqual(hostComponent.testFact.id);
  });

  it('should reflect changes when input fact changes', () => {
    // Change the test fact
    hostComponent.testFact = {
      ...hostComponent.testFact,
      text: 'Updated test fact'
    };

    fixture.detectChanges();

    // Verify the component displays the updated text
    const textElement = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement;
    expect(textElement.textContent).toContain('Updated test fact');
  });

  it('should apply hover styles', () => {
    // Get the card element
    const card = fixture.debugElement.query(By.css('mat-card')).nativeElement;

    // Check that it has the hover classes
    expect(card.classList).toContain('hover:scale-[1.005]');
    expect(card.classList).toContain('hover:shadow-lg');
    expect(card.classList).toContain('hover:border-primary-50');
  });
});
